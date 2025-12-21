import { BatchListModel } from '../models'

export interface IBatchListRepository {
	findAll(): Promise<BatchListModel[]>
}
export interface IBatchListService {
	findBatchList(userId: number): Promise<BatchListModel[]>
}
