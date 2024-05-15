import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useFetch } from '../../hooks/use_fetch';
import { ResponseType } from '../../types/fetch_types';
import { Room } from '../../types/room';
import { Sidebar } from './sidebar';
import { ChannelList } from './channel_list';
import { Message } from '../../types/message';

export const Layout = () => {
    const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('lastViewedRoomId') as number | null);
    const { fetch, data: roomData } = useFetch<ResponseType<Room[]>>('api/rooms');
    const { fetch: fetchMessages, data: messageData } = useFetch<ResponseType<Message[]>>('api/messages');
    const [messages, setMessages] = useState<Message[]>([]);
    const [channelId, setChannelId] = useState<number>();

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        fetchMessages(null, `api/messages/channel/${channelId}`);
    }, [channelId]);

    useEffect(() => {
        if (!messageData) {
            return;
        }

        setMessages(messageData?.data);
    }, [messageData]);

    function setAndSaveRoom(id: number) {
        setCurrentRoom(id);
        localStorage.setItem('lastViewedRoomId', id.toString());
    }

    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }}>
            <Sidebar rooms={roomData?.data} onRoomClick={setAndSaveRoom} currentRoomId={currentRoom} />
            <div className="main">
                {currentRoom && <ChannelList roomId={currentRoom} onChannelSelected={setChannelId} />}
                <div className="messages-container">
                    <div className="messages">
                        {messages.map(m => <MessageItem key={m.id} message={m} />)}
                    </div>
                    <form className="input" onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <input type="text" min="1" max="1024" />
                        <button style={{ userSelect: 'none' }}>{'<'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

interface MessageProps {
    message: Message;
};

function MessageItem(props: MessageProps) {
    const { text, username, created_at } = props.message;
    return (
        <div className="message">
            <div>
                <small className="">by: {username}</small>
                <small className="float-end">{new Date(created_at).toLocaleString()}</small>
            </div>
            <div>{text}</div>
        </div>
    );
}

