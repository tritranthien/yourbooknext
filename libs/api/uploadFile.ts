import API from './api'

export const upLoadPoster = async (Formdata: any) => {
    const res = await API.post('/file/upload',Formdata);
    return res.data;
}

export const upLoadFont = async (Formdata: any) => {
    const res = await API.post('/file/font', Formdata);
    return res.data;
}
export const getPosters = async (next_cursor?: string) => {
    const res = await API.get(`/file/posters${next_cursor ? `?next_cursor=${next_cursor}` : ''}`);
    return res.data;
}


