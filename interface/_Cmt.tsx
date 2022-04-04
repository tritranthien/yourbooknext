import { User } from "./_User";

export interface Cmt{
    content:string,
    novel:string,
    parent?:string
}
export interface ServerCmt extends Cmt{
    auth: User,
    _id: string,
    repCount: number
}
