import { CommonModule, NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-long-text',
	standalone: true,
	host: { class: 'field-long-text' },
	imports: [NgClass, NgIf, InputTextareaModule, ReactiveFormsModule, FormsModule, CommonModule],
	templateUrl: './field-long-text.component.html',
	styleUrl: './field-long-text.component.scss'
})
export class FiledLongtextComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	constructor() {}
}
