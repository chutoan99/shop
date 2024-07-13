import axios from 'axios'

export const FetchProvince = async () => {
	try {
		const response = await axios({
			method: 'get',
			url: 'https://api.mysupership.vn/v1/partner/areas/province'
		})
		if (response.status === 200) {
			return response.data.results
		} else {
			return []
		}
	} catch (error) {
		console.log(error, 'error')
	}
}

export const FetchDistrict = async (provinceCode: any) => {
	try {
		const response = await axios({
			method: 'get',
			url: `https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`
		})
		if (response.status === 200) {
			return response.data.results
		} else {
			return []
		}
	} catch (error) {
		console.log(error, 'error')
	}
}

export const FetchWard = async (districtCode: any) => {
	try {
		const response = await axios({
			method: 'get',
			url: `https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`
		})
		if (response.status === 200) {
			return response.data.results
		} else {
			return []
		}
	} catch (error) {
		console.log(error, 'error')
	}
}
