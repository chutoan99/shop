import { Expose } from 'class-transformer'

export class DetailResponseModel<T> {
	@Expose()
	err!: number

	@Expose()
	msg!: string

	@Expose()
	response!: T
}
