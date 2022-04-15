import { useQuery } from 'react-query';
import { getChaps } from '../../libs/api/novelAPI';
export const useChaps = (novel:string,page: number) => {
    return useQuery(['allMyChaps',page,novel],()=>getChaps(novel,page));
}
