import { PostHistoryTrackingModel } from '../model'

export interface IPostHistoryTrackingService {
	findAll(userId: number): Promise<PostHistoryTrackingModel[]>
}
export interface IPostHistoryTrackingRepository {
	findAll(userId: number): Promise<PostHistoryTrackingModel[]>
	create(search: PostHistoryTrackingModel): Promise<boolean>
}
