import { atom } from "recoil";
import { User } from "../types/user";

interface AuthState {
    isLoggedIn: boolean;
    user?: User
}

export const authState = atom<AuthState>({
    key: 'Auth',
    default: {
        isLoggedIn: false,
    }
})
