export interface BaseResponse<T> {
	err: number
	msg: string
	response: T
}
