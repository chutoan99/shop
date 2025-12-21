import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { RatingModule } from 'primeng/rating'
import { InputBase } from '../../models/InputBase'

@Component({
	selector: 'app-field-rating',
	standalone: true,
	host: { class: 'field-rating' },
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, RatingModule],
	templateUrl: './field-rating.component.html',
	styleUrl: './field-rating.component.scss'
})
export class FiledRatingComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	@Input() public maxPoint: number = 5
	get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}
	constructor() {}

	ngOnInit(): void {}
}
