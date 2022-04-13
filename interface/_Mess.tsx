import { UserFind } from "./_User";

export interface ServerMess{
    _id:string,
    title:string,
    content:string,
    sender:UserFind,
    reciever: UserFind[],
    createdAt: string,
    updatedAt: string
}