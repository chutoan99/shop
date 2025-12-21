import EnvConfig from '@configs/env.config'
import { Expose, Transform } from 'class-transformer'
import dotenv from 'dotenv'
dotenv.config()

export interface IPagination {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
}

export default class PaginationService implements IPagination {
	@Expose()
	@Transform(({ value }) => Number(value) || 0)
	offset!: number

	@Expose()
	@Transform(({ value }) => Number(value) || 0)
	limit: number

	@Expose()
	@Transform(({ value }) => Number(value) || 0)
	total!: number

	@Expose()
	@Transform(({ value }) => Number(value) || 0)
	totalPage!: number

	@Expose()
	@Transform(({ value }) => Number(value) || 0)
	currentPage!: number

	constructor(limit: number, currentPage: number) {
		this.offset =
			+currentPage && +currentPage > 0 ? (+currentPage - 1) * limit : 0
		this.limit = +limit || Number(EnvConfig.app.limit) || 10
		this.currentPage = +currentPage
	}

	public setTotal(total: number): void {
		this.total = total
		this.totalPage = +Math.ceil(this.total / this.limit)
	}
}
