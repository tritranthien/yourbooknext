
import API, { getAuthHeader } from './api'

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
    const res = await API.get(`/auth/me`,authHeader);
    return res;
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

