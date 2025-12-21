import { PaginationModel } from '@core/model'

export class PaginationAdapter<T> {
	pagination!: PaginationModel
	err!: number
	msg!: string
	response!: T[]

	constructor(data: any) {
		this.pagination = PaginationModel.fromJson(data) as PaginationModel
		this.response = data.response
	}
}
