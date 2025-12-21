import { BannerModel } from '../models'

export interface IBannerRepository {
	findAll(): Promise<BannerModel[]>
}
export interface IBannerService {
	findBanners(userId: number): Promise<BannerModel[]>
}
