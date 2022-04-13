import { Author } from "./_Author";
import { Category } from "./_Category";
import { Novel, SerVerNovel } from "./_Novel";
import { UserFind } from "./_User";

export interface Chap<nv,pt>{
    title:string,
    content:string,
    novel:nv,
    poster?:pt,
}
export interface SerVerChap extends Chap<SerVerNovel,UserFind>{
    _id: string,
    chap: number,
    createdAt: string,
    updatedAt: string
}
