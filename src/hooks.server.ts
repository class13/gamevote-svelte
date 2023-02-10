import * as jose from "jose";
import {redirect} from "@sveltejs/kit";

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
    return await resolve(event);
}

export async function handleFetch({request, fetch}: any) {
    request.headers.set('Content-Type', 'application/json')
    request.headers.set('Accept', 'application/json')
    request = new Request("http://localhost:8080" + request.url, request)
    return fetch(request)
}