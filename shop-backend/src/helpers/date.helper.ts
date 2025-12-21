import { format } from 'date-fns'

export const formatDate = (time: any): any => {
	const date = new Date(time * 1000)
	return date.toISOString()
}

export const formatDateV2 = (time: any): string | null => {
	if (!time) return null
	const date = new Date(time * 1000) // Chuyển timestamp sang Date
	return format(date, 'yyyy-MM-dd HH:mm:ss') // Format theo MySQL
}

export const getCurrentDate = () => {
	const today = new Date()
	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, '0')
	const day = String(today.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}
