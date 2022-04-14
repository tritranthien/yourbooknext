
export interface Category{
    _id: string,
    cate: string,
    e_cate?: string,
    slug?: string
}
export type CategoryWithOutId = Omit<Category,'_id'> & {};