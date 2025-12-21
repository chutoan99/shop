import { BaseSearchDto } from '@core/model/base-search.dto'
import { IsOptional, IsString } from 'class-validator'
import { getConnection } from '@core/libs/mysql/helpers/connection'
import { ResultResponse } from '@core/libs/mysql'
import { PostBaseModel } from '@post/models'
import { plainToInstance } from 'class-transformer'
import { RecordsWithCount } from '@core/interfaces'
export default class SearchPostDto extends BaseSearchDto {
	@IsString()
	@IsOptional()
	name: string = ''

	storeProcedure = 'call sp_get_posts_and_count(?)'

	async getSearchQuery(): Promise<RecordsWithCount<PostBaseModel>> {
		const createParams = {
			page: this.page,
			limit: this.limit
		}

		const [response]: ResultResponse = await getConnection().query(
			this.storeProcedure,
			[JSON.stringify(createParams)]
		)

		const total =
			Array.isArray(response) && response[0]?.[0]?.total
				? response[0][0].total
				: 0

		const posts =
			Array.isArray(response) && Array.isArray(response[1])
				? (response[1] as PostBaseModel[])
				: []

		return {
			total: total,
			records: plainToInstance(PostBaseModel, posts as PostBaseModel[], {
				excludeExtraneousValues: true
			})
		}
	}

	get params() {
		return {
			page: this.page,
			limit: this.limit
		}
	}
}
