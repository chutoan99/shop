import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'discount-pipe',
	standalone: false
})
export class DiscountPipe implements PipeTransform {
	public transform(discount: string): boolean {
		let result: boolean = false
		if (+discount.replace(/[^0-9]/g, '') >= 50) {
			result = true
		} else {
			result = false
		}
		return result
	}
}
