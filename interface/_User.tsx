

export interface User{
    username: string;
}

export interface UserFind extends User{
    username: string;
    _id: string;
    email: string
}