import { SerVerNovel } from './../../interface/_Novel';

import { ServerCmt } from '../../interface/_Cmt';
import { NotiFullRes } from '../../interface/_Noti';
import { UserFind } from '../../interface/_User';
import API, { getAuthHeader } from './api'
interface ServerVoted{
    _id:string,
    novel: SerVerNovel,
    content:string,
    voter: string,
    goldcard: number,
    createdAt: string,
    updatedAt: string
}
export const login = async (username: string,password: string) => {
    const res = await API.post(`/auth/login`,{ 
        username: username, 
        password:password
    });
    return res;
}
export const signUpAPI = async (username: string,password: string, email: string) => {
    const res = await API.post(`/auth/signup`,{ 
        username: username, 
        password:password,
        email: email
    });
    return res;
}
export const getMe = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<UserFind>(`/auth/me`,authHeader);
    return res.data;
}
export const checkMyFollow = async (novelId: string) => {
    const authHeader = getAuthHeader();
    const res = await API.get(`/novels/checkfollow/${novelId}`,authHeader);
    return res;
}
export const Follow = async (novelId: string) => {
    const authHeader = getAuthHeader();
    const res = await API.get(`/novels/follow/${novelId}`,authHeader);
    return res;
}
export const CancelFollow = async (novelId: string) => {
    const authHeader = getAuthHeader();
    const res = await API.get(`/novels/cancelfollow/${novelId}`,authHeader);
    return res;
}
export const voteForNovel = async (novel: string,voteDetail: {goldcard: number}) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`/auth/vote/${novel}`,voteDetail,authHeader);
    return res;
}
export const getMyInfo = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get(`/auth/getmyinfo`,authHeader);
    return res.data;
}
export const getVoted = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<ServerVoted[]>(`/auth/getvoted`,authHeader);
    return res.data;
}
export const getCmted = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<ServerCmt[]>(`/auth/getcmt`,authHeader);
    return res.data;
}
export const finByName = async (text:string) => {
    const res = await API.get<UserFind[]>(`auth/findbyname/${text}`);
    return res.data;
}

export const getNotis = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<NotiFullRes>(`auth/notis`,authHeader);
    return res.data;
}
export const readNoti = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get(`auth/readnotis`,authHeader);
    return res.data;
}
export const readNotiInNav = async (NotiNotRead: string[]) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`auth/readnotisinnav`,NotiNotRead,authHeader);
    return res.data;
}

export const updateProfile = async (data: any) => {
    const authHeader = getAuthHeader();
    const res = await API.patch(`/auth/update`, data, authHeader);
    return res.data;
}
