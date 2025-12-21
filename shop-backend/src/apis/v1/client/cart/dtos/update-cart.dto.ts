import { IsArray, IsNumber, IsOptional } from 'class-validator'
import { variationDto } from './create-cart.dto'

export class UpdateCartDto {
	@IsNumber()
	amount!: number

	@IsArray()
	@IsOptional()
	variation!: variationDto[]
}
