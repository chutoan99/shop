import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertSuggestSearchDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	text!: string

	@Expose()
	count!: number

	static fromJson(jsonData: any): InsertSuggestSearchDto {
		return plainToInstance(InsertSuggestSearchDto, {
			text: jsonData?.text,
			count: jsonData?.count
		})
	}
}
