
export interface Author{
    _id: string,
    name: string,
    birth?: Date | null,
    des?: string,
}
export type AuthorWithOutId = Omit<Author,'_id'>;