export class LocalStorageService {
	static getItem<T = any>(key: string): T | string | null {
		const value = localStorage.getItem(key)
		if (!value) return null

		try {
			return JSON.parse(value) as T
		} catch {
			return value
		}
	}

	static setItem(key: string, value: any) {
		return localStorage.setItem(key, JSON.stringify(value))
	}

	static removeItem(key: string) {
		return localStorage.removeItem(key)
	}

	static clear() {
		localStorage.clear()
	}
}
