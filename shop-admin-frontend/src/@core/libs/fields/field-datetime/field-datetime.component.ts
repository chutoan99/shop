import { CommonModule, NgClass } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, SimpleChanges } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarModule, CalendarTypeView } from 'primeng/calendar'
import { DateTimeFormat } from 'src/app/shared/interfaces'
import { InputBase } from '../../models/InputBase'

type DateFormat = 'dd/mm/yy' | 'mm/yy' | 'yy' | 'hh:mm'

@Component({
	selector: 'app-field-datetime',
	standalone: true,
	host: { class: 'field-datetime' },
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [CalendarModule, ReactiveFormsModule, FormsModule, NgClass, CommonModule],
	templateUrl: './field-datetime.component.html',
	styleUrl: './field-datetime.component.scss'
})
export class FiledDatetimeComponent implements OnChanges {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	protected showTime = false
	protected view: CalendarTypeView
	protected dateInputFormat: DateFormat

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['field']) {
			this.field = changes['field'].currentValue
			this._setFormat(this.field.TypeOption)
		}
	}

	private _setFormat(typeOption: DateTimeFormat) {
		switch (typeOption) {
			case DateTimeFormat.MONTH_YEAR:
				this.dateInputFormat = 'mm/yy'
				this.view = 'month'
				break
			case DateTimeFormat.YEAR:
				this.dateInputFormat = 'yy'
				this.view = 'year'
				break
			case DateTimeFormat.DAY_MONTH_YEAR_TIME:
				this.dateInputFormat = 'dd/mm/yy'
				this.view = 'date'
				this.showTime = true
				break
			case DateTimeFormat.HOUR_MINUTE:
				this.dateInputFormat = 'hh:mm'
				break
			case DateTimeFormat.DAY_MONTH_YEAR:
				this.dateInputFormat = 'dd/mm/yy'
				this.view = 'date'
				this.showTime = false
				break
			default:
				this.dateInputFormat = 'dd/mm/yy'
				this.view = 'date'
				break
		}
	}

	onSelect(value: Date): void {
		// let valueTime: any;
		// if (this.field.TypeOption == 4) {
		//     valueTime = DataUtilsCore.formatDateTime(value, "DD/MM/YYYY HH:mm:ss");
		// } else {
		//     valueTime = DataUtilsCore.formatDateTime(value, "DD/MM/YYYY");
		// }
		// this.form.controls[this.field.Name].setValue(valueTime);
		// let valueTime: any = new Date(value.getTime() - (value.getTimezoneOffset() * 60 * 1000));
		// valueTime = moment(valueTime).format('DD/MM/YYYY')
		// this.form.controls[this.field.Name].setValue(value);
		// new Date(this.dateFix.getTime() - (this.date.getTimezoneOffset() * 60 * 1000))
	}
}
