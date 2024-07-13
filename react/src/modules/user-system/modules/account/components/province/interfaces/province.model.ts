export type ProvinceModel = {
	code: string
	name: string
}

export type DistrictModel = {
	code: string
	name: string
	province: string
}

export type WardModel = {
	code: string
	name: string
	district: string
	province: string
}
