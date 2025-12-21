import { Expose, plainToInstance } from 'class-transformer'
import { InsertBaseDto } from '../base-insert.dto'

export class InsertShopMallDto extends InsertBaseDto {
	@Expose()
	id!: number

	@Expose()
	url!: string

	@Expose()
	image!: string

	@Expose()
	promo_text!: string

	static fromJson(jsonData: any): InsertShopMallDto {
		return plainToInstance(InsertShopMallDto, {
			id: jsonData?.shopid,
			url: jsonData?.url,
			image: `https://cf.shopee.vn/file/dec6ad9d361464deee14f9bec977d29f/${jsonData?.image}`,
			promo_text: jsonData?.promo_text
		})
	}
}
