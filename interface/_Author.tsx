
export interface Author{
    _id: string,
    name: string,
    slug: string,
    birth?: string | null,
    des?: string,
    image: string,
    novelCount: number,
}
export type AuthorWithOutId = Omit<Author,'_id' | 'slug' | 'image' | 'novelCount'>;