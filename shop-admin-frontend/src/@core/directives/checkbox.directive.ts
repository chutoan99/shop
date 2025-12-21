import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core'

@Directive({
	selector: '[appRowCheckbox]'
})
export class RowCheckboxDirective {
	@Input('appRowCheckbox') rowId!: number | string

	@Input() checked: boolean = false

	@Output() checkedChange = new EventEmitter<{ rowId: number | string; checked: boolean }>()

	@HostListener('click', ['$event'])
	onClick(event: MouseEvent) {
		event.stopPropagation()
		this.checked = !this.checked
		this.checkedChange.emit({ rowId: this.rowId, checked: this.checked })
	}
}
