import type {RequestEvent} from "@sveltejs/kit";

import * as jose from "jose"
import {redirect} from "@sveltejs/kit";

export const actions = {
    default: async (event: RequestEvent) => {
        let partyId = event.params.slug;
        const request = await event.request.formData()
        const data = Object.fromEntries(request.entries()) as {username: string}
        const jwtSecret = process.env.JWT_SECRET;
        let secret = new TextEncoder().encode(jwtSecret);

        const jwt = await new jose.SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        event.cookies.set(`usertoken_${partyId}`, jwt)
        let locals = event.locals as {
            api: any
        }
        let attendees = await locals.api.post(`/parties/${event.params.slug}/attendees`, {value: data.username})
        console.log(attendees)
        throw redirect(302, `/party/${partyId}`)
    }
}