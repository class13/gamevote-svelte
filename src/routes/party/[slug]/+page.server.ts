import {redirect} from "@sveltejs/kit";
import * as jose from 'jose'

type Params = {
    params: {slug: number},
    request: any,
    locals: {api: any},

    cookies: any
}
export async function load({params, locals, cookies}: Params) {

    let party = await locals.api.get(`/parties/${params.slug}`)
    let usertoken = cookies.get(`usertoken_${party.id}`);
    if (!usertoken) {
        throw redirect(302, `/party/${party.id}/register`)
    }
    const jwtSecret = process.env.JWT_SECRET;
    let secret = new TextEncoder().encode(jwtSecret);
    let jwt = usertoken

    const { payload } = await jose.jwtVerify(jwt, secret) as unknown as {payload: {username: string}}

    return {
        party: party,
        username: payload.username
    }
}
// todo: implement deletion of options
// todo: implement starting of vote

// todo: implement voting <

// todo: implement a socket to connect to, to get a live option and attendee list
// todo: when entering a party first time need to register always
// todo: include party in payload of jwt token (otherwise it might be used in another party)
export const actions = {
    addOption: async ({locals, params, request}: Params) => {
        let data = await request.formData()
        data = Object.fromEntries(data.entries())
        await locals.api.post(`/parties/${params.slug}/options` , {value: data.option})
        throw redirect(302, `/party/${params.slug}`)
    }
}