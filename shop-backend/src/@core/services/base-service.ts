import { BaseModel, RecordsWithCount } from '@core/interfaces'
import LoggerService from '@core/libs/logger/logger.system'
import PaginationService, {
	IPagination
} from '@core/libs/pagination/pagination.service'
import { BaseSearchDto } from '@core/model'

export interface IBaseService {
	search(queries: BaseSearchDto): Promise<{
		items: BaseModel[]
		meta: IPagination
	}>
}

export class BaseService implements IBaseService {
	constructor(protected readonly _loggerService: LoggerService) {}

	public search = async (
		queries: BaseSearchDto
	): Promise<{
		items: BaseModel[]
		meta: IPagination
	}> => {
		try {
			const result: RecordsWithCount<BaseModel> =
				await queries.getSearchQuery()

			const response: BaseModel[] = result.records as BaseModel[]

			const pagination = new PaginationService(
				queries.limit,
				queries.page
			)

			pagination.setTotal(result.total)

			return {
				items: response,
				meta: {
					...pagination
				}
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
