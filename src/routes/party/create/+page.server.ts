import type {RequestEvent} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";


// todo: add a name to party
// todo: also make the name as the slug
export const actions = {
    default: async ({request, locals}: any) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData.entries()) as {games: string}
        let gamesString = data.games;
        let games = gamesString.split("\n");
        games = games.map(it => it.replace("\r", ""))
        games = games.map(it => it.trim())
        games = games.filter(it => it !== "")

        let party = {
            attendees: [locals.username],
            options: games
        }
        let result = await locals.api.post("/parties", party) as {id: number}

        throw redirect(302, `/party/${result.id}`)
    }
}