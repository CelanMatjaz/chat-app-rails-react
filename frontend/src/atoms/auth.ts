import { atom } from "recoil";
import { User } from "../types/user";

interface AuthState {
    logged_in: boolean;
    user?: User
}

export const authState = atom<AuthState>({
    key: 'Auth',
    default: {
        logged_in: false,
    }
})
