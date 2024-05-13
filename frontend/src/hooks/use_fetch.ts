import { useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

type Method = 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE';


export function useFetch<DataType = any>(path: string, method: Method = 'GET') {
    const [data, setData] = useState<DataType>();
    const [requestFailed, setRequestFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function _fetch(body: any) {
        setRequestFailed(false);
        setIsLoading(true);

        try {
            const res = await fetch(`${backendUrl}/${path}`, {
                method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            setData(data);
        } catch (e) {
            setRequestFailed(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    return { fetch: _fetch, isLoading, data, requestFailed };
}





