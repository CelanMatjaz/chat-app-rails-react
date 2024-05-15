import { useState } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

type Method = 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE';


export function useFetch<DataType = any>(path: string, method: Method = 'GET', callback?: (data: DataType) => void) {
    const [data, setData] = useState<DataType>();
    const [requestFailed, setRequestFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function _fetch(body: any = null) {
        setRequestFailed(false);
        setIsLoading(true);

        try {
            const res = await fetch(`${backendUrl}/${path}`, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            const data = await res.json();

            setData(data);

            if (callback) {
                callback(data);
            }
        } catch (e) {
            setRequestFailed(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    return { fetch: _fetch, isLoading, data, requestFailed };
}





