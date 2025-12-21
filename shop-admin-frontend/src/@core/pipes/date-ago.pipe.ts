import { Pipe, PipeTransform } from '@angular/core'
import {
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
	differenceInWeeks,
	differenceInMonths,
	differenceInYears
} from 'date-fns'

@Pipe({
	name: 'dateAgo',
	standalone: true
})
export class DateAgoPipe implements PipeTransform {
	transform(value: Date | string | number): string {
		if (!value) return ''

		const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value
		const now = new Date()

		console.log(date, 'datedatedate')

		// Tính toán khoảng cách tính theo phút
		const minutes = differenceInMinutes(now, date)
		if (minutes < 1) return 'Vừa xong'
		if (minutes < 60) return `${minutes} phút`

		// Tính theo giờ
		const hours = differenceInHours(now, date)
		if (hours < 24) return `${hours} giờ`

		// Tính theo ngày
		const days = differenceInDays(now, date)
		if (days < 7) return `${days} ngày`

		// Tính theo tuần
		const weeks = differenceInWeeks(now, date)
		if (weeks < 4) return `${weeks} tuần`

		// Tính theo tháng
		const months = differenceInMonths(now, date)
		if (months < 12) return `${months} tháng`

		// Tính theo năm
		const years = differenceInYears(now, date)
		return years === 1 ? '1 năm' : `${years} năm`
	}
}
