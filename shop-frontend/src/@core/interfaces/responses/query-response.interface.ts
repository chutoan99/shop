export interface IQueryResponse<T> {
	err: number
	msg: string
	total: number
	response: T
}
