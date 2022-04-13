import { useQuery } from 'react-query';
import { getByAuthor } from '../../libs/api/novelAPI';
export const useAuthorNovels = (author:string) => {
    return useQuery(['allNovelsOfAuthor',author],()=>getByAuthor(author));
}
