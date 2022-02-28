import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Chap, SerVerChap } from '../../interface/_Chap';
import { Novel, SerVerNovel } from '../../interface/_Novel'
import API from './api'

export interface resStatus{
    success: boolean,
    error?: string
}

export const getAllNovels = async () => {
    const res = await API.get<SerVerNovel[]>('/novels/all');
    return res.data;
}
export const addnewNovel = async (novel: Novel<string,string>) => {
    const res = await API.post('/novels',novel);
    return res;
}
export const updateNovel = async (novel_id: string,novel: Novel<string,string>) => {
    const res = await API.put<Novel<Author,Category>[]>(`/novels/update/${novel_id}`,novel);
    return res;
}
export const addNewChap = async (chap: Chap<string,string>) => {
    const res = await API.post(`/novels/newchap`,chap);
    return res;
}
export const getChap = async (novel_id:string,chap:number ) => {
    const res = await API.get<SerVerChap>(`/novels/chap/${novel_id}/${chap}`);
    return res.data;
}
export const getChaps = async (novel: string, page:number ) => {
    const res = await API.get<SerVerChap[]>(`/novels/chaps/${novel}?page=${page}`);
    return res.data;
}
export const getNovel = async (slug:string) => {
    const res = await API.get<Novel<Author,Category>>(`/novels/${slug}`);
    return res.data;
}
export const getNovelNewest = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/newest`);
    return res.data;
}
export const getModVote = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/modvote`);
    return res.data;
}

