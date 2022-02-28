import { Author } from "./_Author";
import { Category } from "./_Category";
import { Novel } from "./_Novel";

export interface Chap<nv,pt>{
    title:string,
    content:string,
    novel:nv,
    poster?:pt,
}
export interface SerVerChap extends Chap<Novel<Author,Category>,string>{
    _id: string,
    chap: number
}
