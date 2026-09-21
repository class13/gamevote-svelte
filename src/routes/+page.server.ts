import {redirect} from "@sveltejs/kit";
import {getContext, setContext} from "svelte";
import {ApiClient} from "../lib/apiclient/apiclient"
import type {Locals} from "../hooks.server";

export async function load({locals}: {locals: Locals}) {
    return {
        recentParties: await locals.apiclient.get("/parties/recent")
    }
}

export const actions = {
    createparty: async function({locals}: {locals: Locals}) {
        let party = await locals.apiclient.post("/parties", {})
        throw redirect(302, `/party/${party.code}`)
    }
}
