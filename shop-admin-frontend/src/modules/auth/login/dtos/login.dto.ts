import { Expose } from 'class-transformer'

export default class LoginDto {
	@Expose()
	email!: string

	@Expose()
	password!: string
}
