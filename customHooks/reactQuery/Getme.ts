import { useQuery, UseQueryOptions } from 'react-query';
import { UserFind } from '../../interface/_User';
import { getMe } from '../../libs/api/authAPI';

export const useGetme = () => {
    return useQuery('checkLogin', getMe);
}
