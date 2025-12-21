import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaseService, SafeHtmlPipe } from 'channn-lib'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { DialogModule } from 'primeng/dialog'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TabMenuModule } from 'primeng/tabmenu'
import { TabViewModule } from 'primeng/tabview'
import { ToastModule } from 'primeng/toast'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import {
	DynamicBooleanComponent,
	DynamicCheckboxComponent,
	DynamicInputComponent,
	DynamicLongtextComponent,
	DynamicProcessComponent,
	DynamicRadioComponent,
	DynamicSelectOptionComponent
} from 'src/app/shared/field-form/field-field'
import { InputBase } from 'src/app/shared/field-form/models/InputBase'
import { ModePopup, POPUP_PROCESS } from '../../../resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

export type ParamsFieldProcess = {
	ValueDefault: number
	TypeValue: IsValue
	DataCMS: OptionCms
}

@Component({
	selector: 'app-field-config-process',
	standalone: true,
	templateUrl: './field-config-process.component.html',
	styleUrl: './field-config-process.component.scss',
	imports: [
		CommonModule,
		DialogModule,
		ToastModule,
		ButtonModule,
		ButtonComponent,
		RadioButtonModule,
		ReactiveFormsModule,
		CheckboxModule,
		FormsModule,
		TabMenuModule,
		TabViewModule,
		SafeHtmlPipe,
		DynamicInputComponent,
		DynamicBooleanComponent,
		DynamicLongtextComponent,
		DynamicCheckboxComponent,
		DynamicRadioComponent,
		DynamicSelectOptionComponent,
		DynamicProcessComponent
	]
})
export class FieldConfigProcessComponent extends FieldConfigBaseComponent {
	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_PROCESS

	constructor(
		protected override readonly _baseService: BaseService,
		protected override readonly _cdr: ChangeDetectorRef
	) {
		super(_baseService, _cdr)
	}

	// ************************************************************
	// HANDLE FORM
	// ************************************************************

	/**
	 * @return {void}
	 */
	protected override defineColumn(): void {
		if (this.isModePopup === ModePopup.Create) {
			this.formPopup = this._createFormConfig()
		} else {
			this.formPopup = this._editFormConfig(this.formEdit)
			if (this.formEdit.value?.DefaultValue?.TypeValue === IsValue.DataCMS) {
				this.getColumnCMS()
			}
		}
		this.isLoading = false
	}

	/**
	 * @return {FormGroup<IFormGroup<FieldDefault>>}
	 */
	private _createFormConfig(): FormGroup<IFormGroup<FieldDefault>> {
		return new FormGroup<IFormGroup<FieldDefault>>({
			InputName: new FormControl('', {
				validators: [Validators.required],
				asyncValidators: [customValidator(this.fields)]
			}),
			Guide: new FormControl(''),
			Question: new FormControl(''),
			IsRequired: new FormControl(false),
			IsReadOnly: new FormControl(false),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldProcess>>({
				TypeValue: new FormControl(IsValue.ValueDefault),
				ValueDefault: new FormControl(50),
				DataCMS: new FormControl()
			})
		})
	}

	/**
	 * @param {FormGroup<IFormGroup<InputBase<any>>>} formEdit
	 * @return {FormGroup<IFormGroup<FieldDefault>>}
	 */
	private _editFormConfig(formEdit: FormGroup<IFormGroup<InputBase<any>>>): FormGroup<IFormGroup<FieldDefault>> {
		return new FormGroup<IFormGroup<FieldDefault>>({
			InputName: new FormControl(formEdit.value?.VnName, {
				validators: [Validators.required]
			}),
			Guide: new FormControl(formEdit.value?.Guide),
			Question: new FormControl(formEdit.value?.Question),
			IsRequired: new FormControl(Boolean(!formEdit.value?.AllowNull)),
			IsReadOnly: new FormControl(Boolean(!formEdit.value?.AllowEdit)),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldProcess>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				DataCMS: new FormControl(formEdit.value?.DefaultValue?.DataCMS),
				ValueDefault: new FormControl(formEdit.value?.DefaultValue?.ValueDefault)
			})
		})
	}
}
