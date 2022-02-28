import { Author,AuthorWithOutId } from '../../interface/_Author';

import API from './api'

export const getAuthors = async (text: string) => {
    const res = await API.get<Author[]>(`/author/search/${text}`);
    return res.data;
}
export const storeNewAuthor = async (newAuthor:AuthorWithOutId) => {
    const res = await API.post(`/author`,newAuthor);
    return res;
}

