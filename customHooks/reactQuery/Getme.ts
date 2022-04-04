import { useQuery } from 'react-query';
import { getMe } from '../../libs/api/authAPI';
export const useGetme = () => {
    return useQuery('checkLogin', getMe, {onError: (err) =>{
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
    },
    cacheTime: 0
});
}
