import React, { useEffect, useRef, useState } from 'react'
import { backendUrl, useFetch } from '../hooks/use_fetch';
import { Room } from '../types/room';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GearIcon } from '@primer/octicons-react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/auth';

export const Layout = () => {
    const [_, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();
    const { response, fetch } = useFetch<Room[]>();
    const { fetch: logout } = useFetch();
    const [showSettings, setShowSettings] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        fetch('api/rooms', 'GET');
    }, []);

    function logoutUser() {
        logout('auth/logout', 'DELETE');
        setAuth({ logged_in: false })
        navigate('/login');
    }

    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }} onMouseLeave={() => setShowSettings(false)}>
            <div className="bg-gray-800 h-screen overflow-y-auto flex flex-col relative" style={{ width: "80px" }}>
                <ul>
                    {response?.data?.map(r => <div key={r.id} onClick={() => navigate(`/${r.id}`)}><RoomIcon room={r} selected={r.id.toString() == roomId} /></div>)}
                </ul>

                <div ref={ref} onClick={() => setShowSettings(s => !s)} className="mx-auto absolute bottom-4 left-1/2 text-gray-400 cursor-pointer hover:bg-gray-900 p-2 rounded-full" style={{ transform: 'translateX(-50%)' }}><GearIcon size={40} /></div>

                {showSettings && createPortal(<div onMouseLeave={() => setShowSettings(false)} className="bg-gray-700 p-2 border border-gray-400 rounded absolute top-7" style={{ top: ref.current?.offsetTop - 5, left: 10, transform: 'translateY(-105%)' }}>
                    <button className="button" onClick={logoutUser}>Logout</button>
                </div>, document.body)}
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
