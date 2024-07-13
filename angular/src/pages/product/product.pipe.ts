import { Pipe, PipeTransform } from '@angular/core'
import { Store } from '@ngrx/store'
@Pipe({ name: 'discount-pipe' })
export class DiscountPipe implements PipeTransform {
	transform(discount: string): any {
		let xx: Number = +discount.replace(/[^0-9]/g, '')
		let resuft: boolean = false
		if (xx >= 50) {
			resuft = true
		} else {
			resuft = false
		}
		return resuft
	}
}
