import { InsertBaseDto } from '../base-insert.dto'
import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance } from 'class-transformer'

export class InsertVoucherDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	voucher_code!: string

	@Expose()
	label!: string

	static fromJson(jsonData: any): InsertVoucherDto {
		return plainToInstance(InsertVoucherDto, {
			id: jsonData?.voucher_info?.promotion_id,
			voucher_code: jsonData?.voucher_info?.voucher_code,
			label: jsonData?.voucher_info?.voucher_code,
			created_at: formatDateV2(jsonData?.ctime),
			updated_at: formatDateV2(jsonData?.ctime)
		})
	}
}
