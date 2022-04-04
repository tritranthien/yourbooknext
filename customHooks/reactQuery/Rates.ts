import { useQuery } from 'react-query';
import { allrates, getChaps } from '../../libs/api/novelAPI';
export const useRates = (novel:string) => {
    return useQuery(['allRates',novel],()=>allrates(novel));
}
