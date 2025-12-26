import API, { getAuthHeader } from "./api";

export const getAllTags = async () => {
    const res = await API.get('/tags');
    return res.data;
}

export const createTag = async (data: { name: string, description?: string }) => {
    const res = await API.post('/tags', data, getAuthHeader());
    return res.data;
}

export const updateTag = async (id: string, data: { name?: string, description?: string }) => {
    const res = await API.patch(`/tags/${id}`, data, getAuthHeader());
    return res.data;
}

export const deleteTag = async (id: string) => {
    const res = await API.delete(`/tags/${id}`, getAuthHeader());
    return res.data;
}
