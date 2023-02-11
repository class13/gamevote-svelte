import * as jose from "jose";
import {redirect} from "@sveltejs/kit";

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
export async function handle({ event, resolve }: any) {
    const apiHost = "http://localhost:8080"

    async function fletch(endpoint: string, method: string, payload?: any) {
        let response = await fetch(`${apiHost}${endpoint}`, {
            method: method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return await response.json()
    }
    // todo: create types for those libs
    event.locals.api = {
        fetch: fletch,
        get: async (endpoint: string) => {
            return await fletch(endpoint, 'GET')
        },
        post: async (endpoint: string, payload: any) => {
            return await fletch(endpoint, 'POST', payload)
        },
        patch: async (endpoint: string, payload: any) => {
            return await fletch(endpoint, 'PATCH', payload)
        },
        put: async (endpoint: string, payload: any) => {
            return await fletch(endpoint, 'PUT', payload)
        },
    }
    event.locals.hypermedia = {
        hydrate: (data: HypermediaContent) => {
            if (data._links == null) return {}
            return Object.fromEntries(
                Object.entries(data._links).map(it => {
                    return [it[0], () => event.locals.api.get(it[1].href)]
                })
            )
        }
    }
    return await resolve(event);
}

export async function handleFetch({request, fetch}: any) {
    request.headers.set('Content-Type', 'application/json')
    request.headers.set('Accept', 'application/json')
    request = new Request("http://localhost:8080" + request.url, request)
    return fetch(request)
}