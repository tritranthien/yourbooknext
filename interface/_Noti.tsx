import { UserFind } from "./_User";

export interface ServerNoti{
    _id:string,
    type: 'newchap' | 'newmess'
    read:boolean,
    user: string,
    link?: string,
    novel?: {
        _id: string,
        title: string,
        slug: string,
    },
    chap?: number,
    sender?: UserFind,
    createdAt: string,
    updatedAt: string
}
export interface NotiFullRes{
    count: number,
    notis: ServerNoti[]
}