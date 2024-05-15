import { User } from "./user";

export interface Message {
    id: number;
    text: string;
    channel_id: number;
    user_id: number;
    username: string;
    created_at: string;
    updated_at: string;
}
