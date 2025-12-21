import PaginationService from '@core/libs/pagination/pagination.service'
import { IndustryModel } from '../model'
import SearchIndustryDto from '../dto/search-industry.dto'
import { PostBaseModel } from '../../post/models'
import { RecordsWithCount } from '@core/interfaces'

export interface IIndustryRepository {
	findAll(): Promise<IndustryModel[]>
	searchPostAndCount(
		queries: SearchIndustryDto
	): Promise<RecordsWithCount<PostBaseModel>>
}

export interface IIndustryService {
	findIndustries(userId: number): Promise<IndustryModel[]>
	searchPosts(
		queries: SearchIndustryDto,
		pagination: PaginationService
	): Promise<PostBaseModel[]>
}
