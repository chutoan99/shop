import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { SliderModule } from 'primeng/slider'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-process',
	standalone: true,
	host: { class: 'app-field-process' },
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, SliderModule],
	templateUrl: './field-process.component.html',
	styleUrl: './field-process.component.scss'
})
export class FiledProcessComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}
	constructor() {}

	ngOnInit(): void {}
}
