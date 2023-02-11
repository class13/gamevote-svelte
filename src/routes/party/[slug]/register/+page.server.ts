import * as jose from "jose"
import {redirect} from "@sveltejs/kit";
import type {Locals} from "../../../../hooks.server";

type RequestEvent = {
    params: any,
    locals: Locals,
    cookies: any,
    request: any
}
export const actions = {
    default: async ({params, locals, cookies, request}: RequestEvent) => {
        let partyId = params.slug;
        const formData = await request.formData()
        const data = Object.fromEntries(formData.entries()) as {username: string}
        const jwtSecret = process.env.JWT_SECRET;
        let secret = new TextEncoder().encode(jwtSecret);

        const jwt = await new jose.SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        cookies.set(`usertoken_${partyId}`, jwt)
        let attendees = await locals.apiclient.post(`/parties/${params.slug}/attendees`, {value: data.username})
        throw redirect(302, `/party/${partyId}`)
    }
}