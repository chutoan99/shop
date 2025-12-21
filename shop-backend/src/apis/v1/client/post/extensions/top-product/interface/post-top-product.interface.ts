import { PostTopProductModel } from '../model'

export interface IPostTopProductService {
	findAll(userId: number): Promise<PostTopProductModel[]>
}
export interface IPostTopProductRepository {
	findAll(): Promise<PostTopProductModel[]>
}
