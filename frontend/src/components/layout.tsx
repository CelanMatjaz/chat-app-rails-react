import React, { useEffect, useState } from 'react'
import { backendUrl, useFetch } from '../hooks/use_fetch';
import { Room } from '../types/room';
import { Message } from '../types/message';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const Layout = () => {

    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();
    const { response, fetch } = useFetch<Room[]>();

    useEffect(() => {
        fetch('api/rooms', 'GET');
    }, []);

    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }}>
            <div className="bg-gray-800 h-screen overflow-y-auto" style={{ width: "80px" }}>
                <ul>
                    {response?.data?.map(r => <div key={r.id} onClick={() => navigate(`/${r.id}`)}><RoomIcon room={r} selected={r.id.toString() == roomId} /></div>)}
                </ul>
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
}

interface RoomIconProps {
    room: Room;
    selected: boolean;
}

function RoomIcon(props: RoomIconProps) {
    const { room: r, selected } = props;
    return (
        <li className={`room-icon ${selected ? 'selected' : ''}`} >
            <img src={`${backendUrl}/${r.image_url}`} alt="room image" />
        </li >
    );
}
