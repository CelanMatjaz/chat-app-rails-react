import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/use_fetch';
import { Message } from '../types/message';
import { createSocket } from '../web_socket';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/auth';
import { PaperAirplaneIcon, PencilIcon, XIcon } from '@primer/octicons-react'

export const Channel: React.FC = () => {
    const [auth] = useRecoilState(authState);
    const { channelId } = useParams<{ channelId: string }>();
    const [socket, setSocket] = useState<WebSocket>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState('');
    const [editMessageId, setEditMessageId] = useState<number | null>();
    const [editMessageText, setEditMessageText] = useState('');
    const { response: messageResponse, fetch: fetchMessages } = useFetch<Message[]>();
    const { fetch: createMessage } = useFetch<Message>();
    const { fetch: updateMessage } = useFetch();
    const { fetch: deleteMessage } = useFetch();

    useEffect(() => {
        setSocket(createSocket<{ message: Message, status: string }>('MessagesChannel', { id: channelId }, (data) => {
            switch (data.status) {
                case 'created':
                    setMessages(state => [data.message, ...state]);
                    break;
                case 'updated':
                    setMessages(state => {
                        const newArr = [...state];
                        const index = newArr.findIndex(m => m.id == data.message.id);
                        newArr[index] = { ...data.message };
                        return newArr;
                    });
                    break;
                case 'deleted':
                    setMessages(state => [data.message, ...state].filter(m => m.id != data.message.id));
                    break;
            }
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

    function setEditMessage(id: number | null, text: string) {
        setEditMessageId(id);
        setEditMessageText(text);
    }

    function submitMessage(e: React.FormEvent) {
        e.preventDefault();
        createMessage('/api/messages', 'POST', {
            message: {
                text: messageText,
                channel_id: channelId
            }
        });
        setMessageText('');
    }

    return (
        <div className="messages-container">
            <div className="messages">
                {messages.map(m => {
                    const hasUser = m.user_id == auth.user?.id;
                    const isEdit = m.id == editMessageId;

                    return <div className="message" key={m.id}>
                        {hasUser && <div className="message-crud-buttons">
                            <button onClick={() => { setEditMessage(m.id, m.text); }}><PencilIcon /></button>
                            <button onClick={() => { deleteMessage(`api/messages/${m.id}`, 'DELETE'); }}><XIcon /></button>
                        </div>}
                        <small className="float-end">{new Date(m.created_at).toLocaleString()}</small>
                        <form className="mt-5">
                            {isEdit ? <textarea className="message-edit" value={editMessageText} onChange={e => setEditMessage(m.id, e.target.value)} /> : m.text}
                            {isEdit && <div>
                                <button style={{ marginLeft: '0' }} type="submit" onClick={() => {
                                    updateMessage(`api/messages/${m.id}`, 'PATCH', { message: { text: editMessageText, channel_id: channelId } });
                                    setEditMessage(null, '');
                                }}>Update</button>
                                <button onClick={() => { setEditMessage(null, ''); }}>Cancel</button>
                            </div>}
                        </form>
                        <small className="float-end">by: {m.username}</small>
                    </div>
                })}
            </div>
            <form className="input" onSubmit={submitMessage}>
                <input type="text" min="1" max="1024" value={messageText} onChange={e => setMessageText(e.target.value)} />
                <button style={{ userSelect: 'none' }}><PaperAirplaneIcon className="rotate-180" /></button>
            </form>
        </div >
    )
}
