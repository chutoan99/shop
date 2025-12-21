import { Pipe, PipeTransform } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators'

@Pipe({
	name: 'debounce',
	pure: false,
	standalone: true
})
export class DebouncePipe implements PipeTransform {
	private subjects: { [key: string]: Subject<any> } = {}
	private observables: { [key: string]: Observable<any> } = {}

	transform(value: any, debounceTimeMs: number, key: string = 'default'): Observable<any> {
		if (!this.subjects[key]) {
			this.subjects[key] = new Subject<any>()
			this.observables[key] = this.subjects[key]
				.asObservable()
				.pipe(startWith(value), debounceTime(debounceTimeMs), distinctUntilChanged())
		}
		this.subjects[key].next(value)
		return this.observables[key]
	}
}
