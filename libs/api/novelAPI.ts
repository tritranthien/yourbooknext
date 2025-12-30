import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Chap, SerVerChap } from '../../interface/_Chap';
import { Novel, NovelSearch, ServerFollowData, SerVerNovel, ServerNovelPaging } from '../../interface/_Novel'
import { ServerRatting } from '../../interface/_Ratting';
import { UserFind } from '../../interface/_User';
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
    const authHeader = getAuthHeader();
    const res = await API.post('/novels',novel,authHeader);
    return res;
}
export const updateNovel = async (novel_id: string,novel: Novel<string,string>) => {
    const res = await API.put<SerVerNovel[]>(`/novels/update/${novel_id}`,novel);
    return res;
}
export const addNewChap = async (chap: Chap<string,string>) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`/novels/newchap`,chap,authHeader);
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
export const getChapsNoLimit = async (novel: string) => {
    const res = await API.get<SerVerChap[]>(`/novels/fullchaps/${novel}`);
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
    const res = await API.get<ServerNovelPaging>(`/novels/getbycate/${cateId}?page=${page}`);
    return res.data;
}
export const novelsCompletedByCate = async (cateId: string,page:number = 1) => {
    const res = await API.get<SerVerNovel[]>(`/novels/getcompleted/${cateId}?page=${page}`);
    return res.data;
}
export const bestViewsInCate = async (cateId: string) => {
    const res = await API.get<ServerNovelPaging>(`/novels/bestviews/${cateId}`);
    return res.data;
}
export const filterInCate = async (cateId:string,page:number=1,stt?:string,cnum?:number,srt?:string, search?:string) => {
    const res = await API.get<ServerNovelPaging>(`/novels/filterincate/${cateId}?page=${page}&stt=${stt}&cnum=${cnum}&srt=${srt}&search=${search || ''}`);
    return res.data;
}
export const getByTurn = async (turn:string,page:number=1,stt?:string,cnum?:number,srt?:string, search?:string) => {
    let url = `/novels/turn/${turn}?page=${page}`;
    if(stt) url += `&stt=${stt}`;
    if(cnum) url += `&cnum=${cnum}`;
    if(srt) url += `&srt=${srt}`;
    if(search) url += `&search=${search}`;
    const res = await API.get<ServerNovelPaging>(url);
    return res.data;
}
export const getByAuthor = async (author:string) => {
    const res = await API.get<SerVerNovel[]>(`/novels/getbyauthor/${author}`);
    return res.data;
}

export const searchAll = async (text:string) => {
    const res = await API.get<(NovelSearch | Author)[]>(`/novels/search/${text}`);
    return res.data;
}

export const getPendingNovels = async (page: number = 1) => {
    const authHeader = getAuthHeader();
    const res = await API.get<ServerNovelPaging>(`/novels/admin/pending?page=${page}`, authHeader);
    return res.data;
}

export const approveNovel = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await API.patch(`/novels/admin/approve/${id}`, {}, authHeader);
    return res.data;
}

export const rejectNovel = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await API.delete(`/novels/admin/reject/${id}`, authHeader);
    return res.data;
}