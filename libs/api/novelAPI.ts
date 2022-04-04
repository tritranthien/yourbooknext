import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Chap, SerVerChap } from '../../interface/_Chap';
import { Novel, ServerFollowData, SerVerNovel } from '../../interface/_Novel'
import { ServerRatting } from '../../interface/_Ratting';
import API, { getAuthHeader } from './api'

export interface resStatus{
    success: boolean,
    error?: string
}

export const getAllNovels = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<SerVerNovel[]>('/novels/all',authHeader);
    return res.data;
}
export const addnewNovel = async (novel: Novel<string,string>) => {
    const res = await API.post('/novels',novel);
    return res;
}
export const updateNovel = async (novel_id: string,novel: Novel<string,string>) => {
    const res = await API.put<SerVerNovel[]>(`/novels/update/${novel_id}`,novel);
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
    const res = await API.get<SerVerNovel[]>(`/novels/${slug}`);
    return res.data;
}
export const getNewNovels = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/newnovels`);
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
export const getHasNewChaps = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/hasnewchap`);
    return res.data; 
}
export const getMostViews = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/mostviews`);
    return res.data;
}
export const getMostLikes = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/mostlikes`);
    return res.data;
}
export const getMostFollows = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/mostfollow`);
    return res.data;
}
export const SendMyRate = async (myrate:{ novel: string, content: string, scores: number }) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`/novels/ratting`,myrate, authHeader);
    return res.data;
}
export const rated = async (novelId: string)=>{
    const authHeader = getAuthHeader();
    const res = await API.get(`/novels/checkrated/${novelId}`, authHeader);
    return res;
}
export const allrates = async (novelId: string)=>{
    const res = await API.get<ServerRatting[]>(`/novels/allrates/${novelId}`);
    return res.data;
}
export const bestRates = async ()=>{
    const res = await API.get<SerVerNovel[]>(`/novels/bestrates/`);
    return res.data;
}
export const followeds = async ()=>{
    const authHeader = getAuthHeader();
    const res = await API.get<ServerFollowData[]>(`/novels/myfollowed`,authHeader);
    return res.data;
}
export const bestvotes = async () => {
    const res = await API.get<SerVerNovel[]>(`/novels/bestvotes`);
    return res.data;
}
export const novelsBycate = async (cateId: string,page:number = 1) => {
    const res = await API.get<SerVerNovel[]>(`/novels/getbycate/${cateId}?page=${page}`);
    return res.data;
}
export const novelsCompletedByCate = async (cateId: string,page:number = 1) => {
    const res = await API.get<SerVerNovel[]>(`/novels/getcompleted/${cateId}?page=${page}`);
    return res.data;
}
export const bestViewsInCate = async (cateId: string,page:number = 1) => {
    const res = await API.get<SerVerNovel[]>(`/novels/bestviews/${cateId}?page=${page}`);
    return res.data;
}