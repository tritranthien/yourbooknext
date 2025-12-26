
export interface Category{
    _id: string,
    cate: string,
    e_cate?: string,
    slug?: string,
    icon?: string,
    editable?: boolean,
    novelCount?: number
}
export type CategoryWithOutId = Omit<Category,'_id'> & {};