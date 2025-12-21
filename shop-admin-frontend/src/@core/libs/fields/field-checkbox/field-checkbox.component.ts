import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputBase } from '@core/libs/form-builder/models'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
@Component({
	selector: 'app-field-checkbox',
	standalone: true,
	host: { class: 'field-checkbox' },
	imports: [ReactiveFormsModule, FormsModule, NzCheckboxModule, CommonModule],
	templateUrl: './field-checkbox.component.html',
	styleUrl: './field-checkbox.component.scss'
})
export class FiledCheckboxComponent {
	@Input() public field!: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	constructor(private readonly _cdr: ChangeDetectorRef) {}
}
