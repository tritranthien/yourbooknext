import { CategoryWithOutId } from './../../interface/_Category';
import { Category } from '../../interface/_Category';
import API from './api'

export const getAllCates = async () => {
    const res = await API.get<Category[]>('/category');
    return res.data;
}
export const storeNewCate = async (Cate:CategoryWithOutId) => {
    const res = await API.post('/category',Cate);
    return res.data;
}

