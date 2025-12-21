import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { InputBase } from '../../models/InputBase'

import { Currency } from 'src/app/modules/survey/resources'
import { CurrencyDirective } from 'src/app/shared/directives'
@Component({
	selector: 'app-field-currency',
	standalone: true,
	host: { class: 'field-currency' },
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, CurrencyDirective],
	templateUrl: './field-currency.component.html',
	styleUrl: './field-currency.component.scss'
})
export class FiledCurrencyComponent {
	@Input() field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	@Input() currency: Currency
	@Input() format: any
	get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}

	ngOnInit(): void {}
}
