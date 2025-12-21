import NotifyModel from '../schemas/notify.schema'

export interface INotifyService {
	findAll(userId: number): Promise<(typeof NotifyModel)[]>
}
