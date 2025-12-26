import API, { getAuthHeader } from './api'
import { UserFind } from '../../interface/_User'
import { SerVerNovel } from '../../interface/_Novel'

export const getAdminStats = async () => {
    const authHeader = getAuthHeader();
    const res = await API.get(`/admin/stats`, authHeader);
    return res.data;
}

export const getAllUsers = async (filters: { search?: string, role?: string, page?: number, limit?: number } = {}) => {
    const authHeader = getAuthHeader();
    const params = {
        page: 1,
        limit: 20,
        ...filters
    };
    const res = await API.get<{ users: UserFind[], total: number }>(`/admin/users`, {
        ...authHeader,
        params
    });
    return res.data;
}

export const getAllNovels = async (filters: { title?: string, categoryId?: string | string[], status?: string | string[], authorId?: string | string[], tagIds?: string | string[], page?: number, limit?: number } = {}) => {
    const authHeader = getAuthHeader();
    const params = {
        page: 1,
        limit: 20,
        ...filters
    };
    console.log('API Request: /admin/novels', params);
    const res = await API.get<{ novels: SerVerNovel[], total: number }>(`/admin/novels`, {
        ...authHeader,
        params
    });
    return res.data;
}

export const updateNovel = async (id: string, data: any) => {
    const authHeader = getAuthHeader();
    const res = await API.patch(`/admin/novels/${id}`, data, authHeader);
    return res.data;
}

export const deleteNovel = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await API.delete(`/admin/novels/${id}`, authHeader);
    return res.data;
}
