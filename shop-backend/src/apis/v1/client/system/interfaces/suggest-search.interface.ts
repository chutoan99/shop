import { SuggestSearchModel } from '../models'

export interface ISuggestSearchRepository {
	findAll(): Promise<SuggestSearchModel[]>
}
export interface ISuggestSearchService {
	findAll(userId: number): Promise<SuggestSearchModel[]>
}
