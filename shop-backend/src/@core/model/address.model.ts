import { Expose } from 'class-transformer'

export class AddressObj {
	@Expose()
	districtCode?: number | null

	@Expose()
	district?: string | null

	@Expose()
	provinceCode?: number | null

	@Expose()
	province?: string | null

	@Expose()
	wardCode?: number | null

	@Expose()
	ward?: string | null

	@Expose()
	address?: string
}
