import { AddressObj } from '@core/model'
import { Transform } from 'class-transformer'
import { IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsEmail()
	@IsOptional()
	id!: number

	@IsEmail()
	email!: string

	@IsString()
	name!: string

	@IsOptional()
	sex!: number

	@Transform(({ value }) => (value ? JSON.parse(value) : value))
	address_obj!: AddressObj

	@IsISO8601()
	birthday!: Date

	@IsString()
	@IsOptional()
	phone!: number

	@IsString()
	filename!: string

	@IsString()
	avatar!: string
}
