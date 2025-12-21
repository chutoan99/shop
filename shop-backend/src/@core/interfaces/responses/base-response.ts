import { Expose } from 'class-transformer'

export class BaseResponse {
	@Expose()
	err!: number

	@Expose()
	msg!: string
}
