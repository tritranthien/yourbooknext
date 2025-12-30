import { Author } from "./_Author";
import { Category } from "./_Category";

export interface Novel<TAuthor,TCate>{
    _id?: string,
    author: TAuthor,
    title: string,
    status: 'continue' | 'completed' | 'drop',
    description: string,
    image: string,
    category: TCate,
    tags?: any[],
    poster?: any
}
export interface SerVerNovel extends Novel<Author,Category>{
    _id: string,
    slug:string,
    likes: number,
    views: number,
    chapCount: number,
    createdAt: string,
    updatedAt: string,
    scores: number,
    rate_nums: number
}
export interface ServerFollowData{
 _id: string,
 follower: string,
 novel: SerVerNovel
}
export interface ServerNovelPaging{
    novels:SerVerNovel[],
    total: number
}
export interface NovelSearch{
    title: string,
    _id:string,
    slug:string,
}