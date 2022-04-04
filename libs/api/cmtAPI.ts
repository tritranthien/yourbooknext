import { Cmt, ServerCmt } from './../../interface/_Cmt';

import API, { getAuthHeader } from './api'
export const postMyCmt = async (cmt: Cmt) => {
    const authHeader = await getAuthHeader();
    const res = await API.post(`/cmt/store`,cmt,authHeader);
    return res;
}
export const getCmts = async (novel:string) => {
    const res = await API.get<ServerCmt[]>(`/cmt/all/${novel}`)
    return res.data;
}
export const getReps = async (parent:string) => {
    const res = await API.get<ServerCmt[]>(`/cmt/reps/${parent}`)
    return res.data;
}
