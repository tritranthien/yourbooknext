
import { ServerMess } from '../../interface/_Mess';
import { UserFind } from '../../interface/_User';
import API, { getAuthHeader } from './api'
interface _MessClient{
    title:string,
    content: string,
    recieverList: UserFind[],
}

export const sendMessage = async (mess:_MessClient) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`/mess/sendmess`,mess,authHeader);
    return res;
}

export const mySents = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<ServerMess[]>(`/mess/mysent`,authHeader);
    return res.data;
}
export const myRecievers = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get<ServerMess[]>(`/mess/myrecieved`,authHeader);
    return res.data;
}
