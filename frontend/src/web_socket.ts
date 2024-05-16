import { backendUrl } from "./hooks/use_fetch";

const socketUrl = `${backendUrl.replace('http', 'ws')}/cable`;

type SocketChannel = 'MessagesChannel'

export function createSocket<T = any>(channel: SocketChannel, params: {}, callback: (data: T) => void) {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
        ws.send(JSON.stringify({
            command: 'subscribe',
            identifier: JSON.stringify({
                ...params,
                channel
            })
        }));

        ws.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            if (["ping", "welcome", "confirm_subscription"].includes(data.type)) {
                return;
            }

            callback(data.message);
        }
    }

    ws.onclose = () => {
        // console.log("Disconnected web socket")
    }

    ws.onerror = (e) => {
        // console.log("Websocket error")
    }

    return ws;
}



const ws = new WebSocket(`${backendUrl.replace('http', 'ws')}/cable`);

ws.onopen = () => {
    console.log("Connected to web socket")

    const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
            id: 2,
            channel: 'MessagesChannel'
        })
    }

    ws.send(JSON.stringify(msg))

    ws.onmessage = (ev) => {
        const data = JSON.parse(ev.data);
        if (["ping", "welcome", "confirm_subscription"].includes(data.type)) {
            return;
        }

        const { type, message } = data;
    }
}

ws.onclose = () => {
    console.log("Disconnected web socket")
}

ws.onerror = (e) => {
    console.log("Websocket error")
    console.log(e);
}


