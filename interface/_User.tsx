import { SerVerChap } from "./_Chap";


export interface User{
    username: string;
}

export interface UserFind extends User{
    _id: string;
    email: string
}
