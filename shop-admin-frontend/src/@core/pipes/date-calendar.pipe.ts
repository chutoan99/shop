import { Pipe, PipeTransform } from '@angular/core'
import moment from 'moment/moment'

@Pipe({
	name: 'dateCalendar',
	pure: false,
	standalone: true
})
export class DateCalendarPipe implements PipeTransform {
	transform(value: any, locale: string): any {
		return this.matchValue(value, locale)
	}

	matchValue(data: any, locale: string) {
		return moment(data)
			.locale(locale)
			.calendar({
				sameDay: locale == 'vi' ? '[Hôm nay]' : 'dd',
				nextDay: locale == 'vi' ? '[Ngày mai]' : 'dd',
				nextWeek: 'dd',
				lastDay: locale == 'vi' ? '[Hôm qua]' : 'dd',
				lastWeek: 'dd',
				sameElse: 'dd'
			})
	}
}
