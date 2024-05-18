import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/use_fetch';
import { Channel } from '../types/channel';
import { createSocket } from '../web_socket';

export const Room: React.FC = () => {
    const navigate = useNavigate();
    const { roomId, channelId } = useParams<{ roomId: string, channelId: string }>();
    const { response: channelResponse, fetch: fetchChannels } = useFetch<Channel[]>();
    const [channels, setChannels] = useState<Channel[]>([]);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        setSocket(createSocket<{ channel: Channel, status: string }>('ChannelsChannel', { id: roomId }, (data) => {
            console.log(data)
            switch (data.status) {
                case 'created':
                    setChannels(state => [data.channel, ...state]);
                    break;
                case 'updated':
                    setChannels(state => {
                        const newArr = [...state];
                        const index = newArr.findIndex(c => c.id == data.channel.id);
                        newArr[index] = { ...data.channel };
                        return newArr;
                    });
                    break;
                case 'deleted':
                    setChannels(state => [data.channel, ...state].filter(c => c.id != data.channel.id));
                    break;
            }
        }));

        return () => {
            socket?.close();
        }
    }, []);

    useEffect(() => {
        fetchChannels(`api/channels/room/${roomId}`);
    }, [roomId]);

    useEffect(() => {
        if (!channelResponse) {
            return;
        }

        setChannels(channelResponse.data || []);
    }, [channelResponse]);

    return (
        <>
            <div className="channel-list">
                <ul>
                    {channels.map(c =>
                        <div key={c.id} onClick={() => {
                            if (c.id.toString() == channelId) return;
                            navigate(`/${roomId}/${c.id}`)
                        }
                        } >
                            <ChannelItem channel={c} selected={c.id.toString() == channelId} />
                        </div>
                    )}
                </ul>
            </div>
            <Outlet />
        </>
    )
}

interface ChannelProps {
    channel: Channel,
    selected: boolean
};

function ChannelItem(props: ChannelProps) {
    const { channel: { name }, selected } = props;
    return (
        <li className={`channel ${selected ? 'selected' : ''}`} title={name}>{name}</li>
    );
}
