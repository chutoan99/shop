import { CommonModule, NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-number-int',
	standalone: true,
	host: { class: 'field-number-int' },
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, CommonModule],
	templateUrl: './field-number-int.component.html',
	styleUrl: './field-number-int.component.scss'
})
export class FiledNumberIntComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	constructor() {}

	ngOnInit(): void {}
}
