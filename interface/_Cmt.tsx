import { SerVerNovel } from "./_Novel";
import { User } from "./_User";

export interface Cmt{
    content:string,
    novel:string,
    parent?:string
}
export interface ServerCmt extends Omit<Cmt,'novel'>{
    auth: User,
    _id: string,
    novel:SerVerNovel,
    repCount: number
}
