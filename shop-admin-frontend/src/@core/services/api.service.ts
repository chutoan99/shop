import { AppResource } from '@core/resources'

export class ApiService {
	static apiUrlPrefix = AppResource.BASE_URL

	static getEndpoint(endpoint: string, params?: Record<string, string | number>): string {
		let result = endpoint

		// Replace placeholder nếu có params
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				result = result.replace(`:${key}`, String(value))
			}
		}

		// Trả về endpoint đã có prefix
		return `${this.apiUrlPrefix}/${result}`
	}
}
