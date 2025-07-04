import * as jose from "jose"
import { redirect, type Cookies } from "@sveltejs/kit";
import { Locals } from "../../../../hooks.server";
import Result from "../Result.svelte";

type PartyLocals = Locals & {
    username: string
}
type Params = {
    params: { slug: string },
    request: any,
    locals: PartyLocals,

    cookies: Cookies
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

    const { payload } = await jose.jwtVerify(jwt, secret) as unknown as { payload: { username: string } }
    return payload.username
}

async function getParty(locals: Locals, params: any) {
    return await locals.apiclient.get(`/parties/${params.slug}`)
}
export async function load({ params, locals, cookies }: Params) {
    let party = await getParty(locals, params)

    return {
        party: party,
        baseUrl: process.env.ORIGIN,
        beerSummary: await locals.apiclient.get(`/parties/${params.slug}/beers/summary`)
    }
}
export const actions = {
    addBeer: async ({ locals, params, cookies }: Params) => {
        await locals.apiclient.post(`/parties/${params.slug}/beers`, { attendee: await loadUsername(cookies, params.slug) })
        throw redirect(302, `/party/${params.slug}/beer`)
    }
}