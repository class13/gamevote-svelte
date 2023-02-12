import type {RequestEvent} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import * as jose from "jose";
import {getContext, setContext} from "svelte";
import {ApiClient} from "../lib/apiclient/apiclient";

export async function load(requestEvent: RequestEvent) {
    let cookies = requestEvent.cookies;
    let userToken = cookies.get("userToken");
    if (userToken) {
        let userToken = cookies.get("userToken") as string
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        )
        const {payload} = await jose.jwtVerify(userToken, secret)
        requestEvent.locals = {username: payload.username}
        return {
            username: payload.username
        }
    } else {
        //throw redirect(302, "/register")
    }
}