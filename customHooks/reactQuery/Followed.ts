import { useQuery } from 'react-query';
import { followeds } from '../../libs/api/novelAPI';
export const useGetFollowed = () => {
    return useQuery('followedFromUser',()=>followeds());
}
