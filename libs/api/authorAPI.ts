import { Author, AuthorWithOutId } from '../../interface/_Author';
import API, { getAuthHeader } from './api'

export const getAuthors = async (text: string) => {
    const res = await API.get<Author[]>(`/author/search/${text}`);
    return res.data;
}

export const findBySlug = async (slug: string) => {
    const res = await API.get<Author[]>(`/author/getbyslug/${slug}`);
    return res.data;
}

export const storeNewAuthor = async (newAuthor: AuthorWithOutId) => {
    const authHeader = getAuthHeader();
    const res = await API.post(`/author`, newAuthor, authHeader);
    return res.data;
}

export const getAllAuthors = async () => {
    const res = await API.get<Author[]>(`/author/all`);
    return res.data;
}

export const updateAuthor = async (id: string, data: Partial<AuthorWithOutId>) => {
    const authHeader = getAuthHeader();
    const res = await API.patch(`/author/${id}`, data, authHeader);
    return res.data;
}

export const deleteAuthor = async (id: string, mode?: string) => {
    const authHeader = getAuthHeader();
    const url = mode ? `/author/${id}?mode=${mode}` : `/author/${id}`;
    const res = await API.delete(url, authHeader);
    return res.data;
}

