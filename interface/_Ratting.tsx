import { Author } from "./_Author";
import { Category } from "./_Category";
import { Novel } from "./_Novel";
import { User } from "./_User";

export interface Ratting<T>{
    content: string,
    scores: number,
    novel: string,
    rater: T
}
export interface ServerRatting extends Ratting<User>{
    _id: string
}
