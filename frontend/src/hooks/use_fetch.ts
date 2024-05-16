import { useState } from "react";
import { ResponseType } from "../types/fetch_types";

export const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

type Method = 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE';

export function useFetch<T = any>(loading = true) {
    const [data, setData] = useState<ResponseType<T>>();
    const [isLoading, setIsLoading] = useState(loading);

    async function _fetch(path: string, method: Method = 'GET', body: any = undefined) {
        setIsLoading(true);
        const res = await fetch(`${backendUrl}/${path}`, {
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
            method
        });
        const data = await res.json() as ResponseType<T>;

        setData(data);
        setIsLoading(false)
    }

    return { response: data, isLoading, fetch: _fetch };
}
