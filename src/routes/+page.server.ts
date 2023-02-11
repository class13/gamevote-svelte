import {redirect} from "@sveltejs/kit";

export const actions = {
    createparty: async function({locals}: any) {
        let api = locals.api
        let party = await api.post("/parties", {})
        throw redirect(302, `/party/${party.id}`)
    }
}