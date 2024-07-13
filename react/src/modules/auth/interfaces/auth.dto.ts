export type RegisterDto = {
	name: string
	password: string
	email: string
}
export type LoginDto = {
	password: string
	email: string
}

export type ForgotPasswordDto = {
	email: string
}

export type ResetPasswordDto = {
	email: string
	password: string
	token: string
}
