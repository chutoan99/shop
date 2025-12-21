import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateGroupDto {
	@IsNumber()
	@IsNotEmpty()
	id!: number

	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	description?: string
}
