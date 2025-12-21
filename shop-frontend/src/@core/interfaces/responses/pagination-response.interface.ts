export interface IPaginationResponse<T> {
	err: number
	msg: string
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: T[]
}
