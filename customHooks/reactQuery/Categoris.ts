import { useQuery } from 'react-query';
import { getAllCates } from '../../libs/api/category';
export const useGetAllCates = () => {
    return useQuery('allCates',getAllCates);
}