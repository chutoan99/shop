import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'filterArrayObject',
	pure: false,
	standalone: true
})
export class FilterArrayObjectPipe implements PipeTransform {
	transform(value: any, searchObj: any): any {
		if (!searchObj) {
			return value
		}
		return value.filter((data: any) => this.matchValue(data, searchObj))
	}

	matchValue(data: any, value: any) {
		return Object.keys(data)
			.map((key) => {
				return value[key] === data[key]
			})
			.some((result) => result)
	}
}
