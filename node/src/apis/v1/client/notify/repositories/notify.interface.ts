import { NotifyModel } from "../notify.model";

export interface INotifyRepository {
	findAll(): Promise<NotifyModel[]>
}


