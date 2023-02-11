import {error} from "@sveltejs/kit";

type HypermediaContent = {
    "_links"?: {
        [name: string]: {
            href: string
        }
    }
}
type HydratedHypermediaContent = {[name: string]: () => HypermediaContent}
export class ApiClient {
    private readonly apiHost: string;
    constructor(apiHost: string) {
        this.apiHost = apiHost
    }
    async fetch(endpoint: string, method: string, payload?: any) {
        let response = await fetch(`${this.apiHost}${endpoint}`, {
            method: method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.status != 200) throw error(404, "Party not found")
        return await response.json()
    }
    async get(endpoint: string) {
        return await this.fetch(endpoint, 'GET')
    }
    async post (endpoint: string, payload: any) {
        return await this.fetch(endpoint, 'POST', payload)
    }
    async patch(endpoint: string, payload: any) {
        return await this.fetch(endpoint, 'PATCH', payload)
    }
    async put(endpoint: string, payload: any) {
        return await this.fetch(endpoint, 'PUT', payload)
    }
    // in this case hydration means taking the hypermedia links
    // from a piece of content and turning them into functions to fetch the data from them
    async hydrateHypermedia(response: HypermediaContent): Promise<HydratedHypermediaContent> {
        if (response._links == null) return {}
        return Object.fromEntries(
            Object.entries(response._links).map(it => {
                return [it[0], () => this.get(it[1].href)]
            })
        ) as HydratedHypermediaContent
    }
}