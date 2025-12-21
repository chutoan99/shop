import { CommonModule, NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { InputBase } from '../../models/InputBase'

@Component({
	standalone: true,
	selector: 'app-field-number-percent',
	host: { class: 'field-number-percent' },
	templateUrl: './field-number-percent.component.html',
	styleUrl: './field-number-percent.component.scss',
	imports: [NgClass, NgIf, InputTextModule, ReactiveFormsModule, FormsModule, CommonModule, InputNumberModule]
})
export class FiledNumberPercentComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false

	ngOnInit(): void {}
}
