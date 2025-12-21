import { InsertBaseDto } from '../base-insert.dto'
import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance } from 'class-transformer'

export class InsertDiscountDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	promotion_price!: string

	@Expose()
	hidden_promotion_price!: string

	@Expose()
	text!: string

	@Expose()
	start_time!: string

	@Expose()
	end_time!: string

	static fromJson(jsonData: any): InsertDiscountDto {
		return plainToInstance(InsertDiscountDto, {
			id: jsonData?.itemid,
			promotion_price:
				jsonData?.deep_discount_skin?.skin_data?.promo_label
					?.promotion_price,
			hidden_promotion_price:
				jsonData?.deep_discount_skin?.skin_data?.promo_label
					?.hidden_promotion_price,
			start_time: formatDateV2(
				jsonData?.deep_discount_skin?.skin_data?.promo_label?.start_time
			),
			end_time: formatDateV2(
				jsonData?.deep_discount_skin?.skin_data?.promo_label?.end_time
			),
			created_at: formatDateV2(jsonData?.ctime),
			updated_at: formatDateV2(jsonData?.ctime)
		})
	}
}
