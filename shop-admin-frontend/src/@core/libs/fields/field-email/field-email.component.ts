import { NgClass, NgIf } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChipsModule } from 'primeng/chips'
import { InputTextModule } from 'primeng/inputtext'
import { REGEXP } from 'src/app/shared/resources'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-email',
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	host: { class: 'field-email' },
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, ChipsModule],
	templateUrl: './field-email.component.html',
	styleUrl: './field-email.component.scss'
})
export class FiledEmailComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false

	protected get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	protected get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}

	ngOnInit(): void {}

	/**
	 * @param {any} event
	 * @return {boolean}
	 */
	protected onchangeEmail(event: any): void {
		const value = event.value
		if (!value) return
		const isValid = this._isValidEmail(value)

		if (isValid) return
		setTimeout(() => {
			const chipsElement = document.getElementsByClassName('p-chips-token')
			const lastLiElement = chipsElement[chipsElement.length - 1] as HTMLElement
			lastLiElement.style.border = '1px solid red'
		})
	}

	/**
	 * @param {string} email
	 * @return {boolean}
	 */
	private _isValidEmail(email: string): boolean {
		return REGEXP.EMAIL.test(email)
	}
}
