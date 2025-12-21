import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputBase } from '@core/libs/form-builder/models'
import { NzInputModule } from 'ng-zorro-antd/input'
@Component({
	selector: 'app-field-input',
	standalone: true,
	host: { class: 'field-input' },
	imports: [NgClass, NgIf, NzInputModule, ReactiveFormsModule, FormsModule],
	templateUrl: './field-input.component.html',
	styleUrl: './field-input.component.scss'
})
export class FiledInputComponent {
	@Input() public field!: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	type: string = 'text'
	get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}
	constructor() {}
}
