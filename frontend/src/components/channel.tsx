import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/use_fetch';
import { Message } from '../types/message';
import { createSocket } from '../web_socket';

export const Channel: React.FC = () => {
    const { channelId } = useParams<{ channelId: string }>();
    const [socket, setSocket] = useState<WebSocket>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState('');
    const { response: messageResponse, fetch: fetchMessages } = useFetch<Message[]>();
    const { fetch: createMessage } = useFetch<Message>();

    useEffect(() => {
        setSocket(createSocket<{ message: Message }>('MessagesChannel', { id: channelId }, (data) => {
            setMessages(state => [data.message, ...state]);
        }));

        return () => {
            socket?.close();
        }
    }, []);

    useEffect(() => {
        fetchMessages(`api/messages/channel/${channelId}`);
    }, [channelId]);

    useEffect(() => {
        if (!messageResponse) {
            return;
        }

        setMessages(messageResponse.data || []);
    }, [messageResponse]);

    return (
        <>
            <div className="messages-container">
                <div className="messages">
                    {messages.map(m =>
                        <div className="message" key={m.id}>
                            <div>
                                <small className="float-end">{new Date(m.created_at).toLocaleString()}</small>
                            </div>
                            <div className="mt-5">{m.text}</div>
                            <div>
                                <small className="float-end">by: {m.username}</small>
                            </div>
                        </div>
                    )}
                </div>
                <form className="input" onSubmit={e => {
                    e.preventDefault();
                    createMessage('/api/messages', 'POST', {
                        message: {
                            text: messageText,
                            channel_id: channelId
                        }
                    });
                    setMessageText('');
                }}>
                    <input type="text" min="1" max="1024" value={messageText} onChange={e => setMessageText(e.target.value)} />
                    <button style={{ userSelect: 'none' }}>{'<'}</button>
                </form>
            </div>

        </>
    )
}
