import { FlashSaleModel } from '../models'

export interface IFlashSaleRepository {
	findAll(): Promise<FlashSaleModel[]>
}
export interface IFlashSaleService {
	findFlashSales(userId: number): Promise<FlashSaleModel[]>
}
