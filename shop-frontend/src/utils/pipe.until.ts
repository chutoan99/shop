import moment from 'moment'

export function datePipe(value: Date, format = 'DD/MM/YYYY') {
	return moment(value).format(format)
}
