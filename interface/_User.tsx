import { SerVerChap } from "./_Chap";


export interface User{
    username: string;
    role?: string;
    image?: string;
}

export interface UserFind extends User{
    _id: string;
    email?: string;
}
