import React, { useEffect } from 'react'
import { useFetch } from '../../hooks/use_fetch';
import { ResponseType } from '../../types/fetch_types';
import { Channel } from '../../types/channel';

interface Props {
    roomId: number
    onChannelSelected: (id: number) => void
}

export const ChannelList: React.FC<Props> = (props) => {
    const { roomId } = props;

    const { fetch, data: channelData } = useFetch<ResponseType<Channel[]>>(`api/channels/room/${roomId}`);

    useEffect(() => {
        fetch(null, `api/channels/room/${roomId}`);
    }, [roomId]);

    return (
        <div className="channel-list">
            <ul>
                {channelData?.data?.map(c => <div key={c.id} onClick={() => props.onChannelSelected(c.id)}><ChannelItem channel={c} /></div>)}
            </ul>
        </div>
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
