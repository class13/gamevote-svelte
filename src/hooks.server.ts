import * as jose from "jose";
import {error, redirect} from "@sveltejs/kit";
import {ApiClient} from "./lib/apiclient/apiclient";

type HypermediaContent = {
    "_links"?: {
        [name: string]: {
            href: string
        }
    },
    links?: {
        [name: string]: () => Promise<any>
    }
}
export type Locals = {
    apiclient: ApiClient
}
export async function handle({ event, resolve }: any) {
    const apiHost = "http://localhost:8080"
    const locals = event.locals as Locals
    locals.apiclient = new ApiClient(apiHost)
    return await resolve(event);
}

export async function handleFetch({request, fetch}: any) {
    request.headers.set('Content-Type', 'application/json')
    request.headers.set('Accept', 'application/json')
    request = new Request("http://localhost:8080" + request.url, request)
    return fetch(request)
}