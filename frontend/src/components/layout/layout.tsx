import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useFetch } from '../../hooks/use_fetch';
import { ResponseType } from '../../types/fetch_types';
import { Room } from '../../types/room';
import { Sidebar } from './sidebar';

export const Layout = () => {
    const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('lastViewedRoomId') as number | null);
    const { fetch, isLoading, data: roomData } = useFetch<ResponseType<Room[]>>('api/rooms');

    useEffect(() => {
        fetch();
    }, []);

    function setAndSaveRoom(id: number) {
        setCurrentRoom(id);
        localStorage.setItem('lastViewedRoomId', id.toString());
    }

    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }}>
            <Sidebar rooms={roomData?.data} onRoomClick={setAndSaveRoom} currentRoomId={currentRoom} />
            <div>
            {currentRoom}
                <Outlet />
            </div>
        </div>
    )
}

