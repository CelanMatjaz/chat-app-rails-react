import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/use_fetch';
import { Channel } from '../types/channel';

export const Room: React.FC = () => {
    const navigate = useNavigate();
    const { roomId, channelId } = useParams<{ roomId: string, channelId: string }>();
    const { response: channelResponse, fetch: fetchChannels } = useFetch<Channel[]>();

    useEffect(() => {
        fetchChannels(`api/channels/room/${roomId}`);
    }, [roomId]);

    return (
        <>
            <div className="channel-list">
                <ul>
                    {channelResponse?.data?.map(c =>
                        <div key={c.id} onClick={() => {
                            if (c.id.toString() == channelId) return;
                            navigate(`/${roomId}/${c.id}`)
                        }
                        } >
                            <ChannelItem channel={c} />
                        </div>
                    )}
                </ul>
            </div>
            <Outlet />
        </>
    )
}

interface ChannelProps {
    channel: Channel
};

function ChannelItem(props: ChannelProps) {
    const { name } = props.channel;
    return (
        <li className="channel">{name}</li>
    );
}
