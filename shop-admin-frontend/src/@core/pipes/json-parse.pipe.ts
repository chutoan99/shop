import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'jsonParse',
	standalone: true
})
export class JsonParsePipe implements PipeTransform {
	/**
	 * @param {string} value
	 * @return {any}
	 */
	transform(value: string): any {
		try {
			return JSON.parse(value)
		} catch (error) {
			console.error('Invalid JSON string:', value)
			return null
		}
	}
}
