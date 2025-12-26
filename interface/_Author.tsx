
export interface Author {
    _id: string;
    name: string;
    slug?: string;
    birth?: string | null;
    des?: string;
    description?: string;
    image?: string;
    novelCount?: number;
}
export type AuthorWithOutId = Omit<Author, '_id' | 'novelCount'>;