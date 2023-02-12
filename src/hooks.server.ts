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
    const apiHost = process.env.API_HOST as string
    const locals = event.locals as Locals
    locals.apiclient = new ApiClient(apiHost)
    return await resolve(event);
}