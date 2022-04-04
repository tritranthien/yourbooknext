import { useQuery } from 'react-query';
import { checkMyFollow, getMe } from '../../libs/api/authAPI';
export const useCheckFollow = (novel: string) => {
    return useQuery(['checkFollow',novel], ()=>checkMyFollow(novel));
}
