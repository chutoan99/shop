import { Expose } from 'class-transformer'

export class LoginResponse {
	@Expose()
	expiresIn!: number

	@Expose()
	token!: string
}
