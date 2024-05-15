import React from 'react'
import { Room } from '../../types/room'
import { backendUrl } from '../../hooks/use_fetch';

interface Props {
    rooms?: Room[];
    currentRoomId: number | null;
    onRoomClick: (id: number) => void;
}


export const Sidebar: React.FC<Props> = (props) => {
    const { rooms, currentRoomId, onRoomClick } = props;
    return (
        <div className="bg-gray-800 h-screen overflow-y-auto" style={{ width: "80px" }}>
            <ul>
                {rooms?.map(r => <RoomIcon key={r.id} room={r} selected={r.id == currentRoomId} onRoomClick={onRoomClick} />)}
            </ul>
        </div>
    );
}

interface RoomIconProps {
    room: Room;
    selected: boolean;
    onRoomClick: (id: number) => void;
}

function RoomIcon(props: RoomIconProps) {
    const { room: r, selected, onRoomClick } = props;
    return (
        <li className={`room-icon ${selected ? 'selected' : ''}`} onClick={() => onRoomClick(r.id)}>
            <img src={`${backendUrl}/${r.image_url}`} alt="room image" />
        </li>
    );
}
