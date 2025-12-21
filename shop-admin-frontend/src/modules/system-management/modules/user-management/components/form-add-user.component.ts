import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms'
import { PopupRef } from '@core/libs/popup/popup-ref'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'

@Component({
	templateUrl: '../templates/form-add-user.template.html',
	styleUrls: ['../styles/form-add-user.style.scss'],
	host: {
		'[class.app-form-add-user]': 'true'
	},
	imports: [
		CommonModule,
		FormsModule,
		CommonModule,
		FormsModule,
		NzSelectModule,
		NzInputModule,
		NzToolTipModule,
		NzCheckboxModule,
		NzDatePickerModule
	]
})
export class DynamicQueryBuilderComponent {
	protected form!: FormGroup
	constructor(
		private fb: FormBuilder,
		private readonly _popupRef: PopupRef
	) {
		this.form = this.fb.group({})
	}
}
