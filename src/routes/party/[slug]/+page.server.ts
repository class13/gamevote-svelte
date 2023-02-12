import {redirect} from "@sveltejs/kit";
import * as jose from 'jose'
import type {Locals} from "../../../hooks.server";
import { BASE_URL } from '$env/static/private'

type PartyLocals = Locals & {
    username: string
}
type Params = {
    params: {slug: string},
    request: any,
    locals: PartyLocals,

    cookies: any
}
// todo: if not found go to create
async function loadUsername(cookies: any, partyCode: string) {
    let usertoken = cookies.get(`usertoken_${partyCode}`);
    if (!usertoken) {
        throw redirect(302, `/party/${partyCode}/register`)
    }
    const jwtSecret = process.env.JWT_SECRET;
    let secret = new TextEncoder().encode(jwtSecret);
    let jwt = usertoken

    const { payload } = await jose.jwtVerify(jwt, secret) as unknown as {payload: {username: string}}
    return payload.username
}

async function getParty(locals: Locals, params: any) {
    return await locals.apiclient.get(`/parties/${params.slug}`)
}
export async function load({params, locals, cookies}: Params) {
    let response: any = {}
    let party = await getParty(locals, params)
    let username = await loadUsername(cookies, party.code)
    locals.username = username
    if (party["_links"] && party["_links"].poll) {
        let pollHref = party["_links"].poll.href
        let poll = await locals.apiclient.get(pollHref)
        let outstandingHref = poll["_links"] && poll["_links"].outstanding.href
        let outstanding = await locals.apiclient.get(outstandingHref)
        response.poll = poll
        response.outstanding = outstanding
        response.isUserVoting = outstanding.includes(username)
        console.log(poll)
        let hydratedPoll = await locals.apiclient.hydrateHypermedia(poll)
        console.log(hydratedPoll)
        if (hydratedPoll.results) {
            let results = await hydratedPoll.results()
            response.results = Object.entries(results).map(it => {
                return {
                    option: it[0],
                    votes: it[1]
                }
            })
        }
    }


    return {
        party: party,
        username: username,
        ...response,
        baseUrl: BASE_URL
    }
}
// todo: implement deletion of options
// todo: implement a socket to connect to, to get a live option and attendee list
// todo: include party in payload of jwt token (otherwise it might be used in another party)
export const actions = {
    addOption: async ({locals, params, request}: Params) => {
        let data = await request.formData()
        data = Object.fromEntries(data.entries())
        await locals.apiclient.post(`/parties/${params.slug}/options` , {value: data.option})
        throw redirect(302, `/party/${params.slug}`)
    },
    startVoting: async ({locals, params}: Params) => {
        await locals.apiclient.patch(`/parties/${params.slug}` , {status: "VOTING"})
        throw redirect(302, `/party/${params.slug}`)
    },
    startNomination: async ({locals, params}: Params) => {
        await locals.apiclient.patch(`/parties/${params.slug}` , {status: "NOMINATION"})
        throw redirect(302, `/party/${params.slug}`)
    },
    startResults: async ({locals, params}: Params) => {
        await locals.apiclient.patch(`/parties/${params.slug}` , {status: "RESULTS"})
        throw redirect(302, `/party/${params.slug}`)
    },
    vote: async ({locals, params, request, cookies}: Params) => {
        let data = await request.formData()
        data = Object.fromEntries(data.entries())
        data = Object.keys(data).map((it: any) => {
            let parts = it.split("-");
            let action = parts[0];
            let value = action == "downvote" ? -1 : 1
            parts.shift()
            let name = parts.join("-")
            return [
                name,
                value
            ]
        })
        data = Object.fromEntries(data)
        let username = await loadUsername(cookies, params.slug)
        let party = await getParty(locals, params)
        let pollLink = party["_links"].poll.href
        let response = await locals.apiclient.put(`${pollLink}/votes/${username}`, data);
        console.log(response)
        throw redirect(302, `/party/${params.slug}`)
    }
}