import API, { getAuthHeader } from './api'

export const getSiteSettings = async () => {
    const res = await API.get('/settings');
    return res.data;
}

export const updateSiteSettings = async (settings: any) => {
    const authHeader = getAuthHeader();
    const res = await API.post('/settings', settings, authHeader);
    return res.data;
}
