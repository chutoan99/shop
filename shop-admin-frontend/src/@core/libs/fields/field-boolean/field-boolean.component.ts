import { CommonModule, NgClass } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputBase } from '@core/libs/form-builder/models'
import { InputSwitchModule } from 'primeng/inputswitch'
@Component({
	selector: 'app-filed-boolean',
	standalone: true,
	host: { class: 'filed-boolean' },
	imports: [InputSwitchModule, ReactiveFormsModule, FormsModule, CommonModule, NgClass],
	templateUrl: './filed-boolean.component.html',
	styleUrl: './filed-boolean.component.scss'
})
export class FiledBooleanComponent {
	@Input() public field!: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	constructor() {}
	ngOnInit(): void {}
}
