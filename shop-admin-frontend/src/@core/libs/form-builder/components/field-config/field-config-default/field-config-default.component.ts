import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FiledInputComponent } from '@core/libs/fields/field-input/field-input.component'
import { InputBase } from '@core/libs/form-builder/models'
import { ModePopup, POPUP_DEFAULT_EXTRA } from '@core/libs/form-builder/resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

export type ParamsFieldDefault = {
	ValueDefault: string
	TypeValue: IsValue
	DataCMS: OptionCms
}

@Component({
	selector: 'app-field-config-default',
	standalone: true,
	templateUrl: './field-config-default.component.html',
	styleUrl: './field-config-default.component.scss',
	imports: [
		CommonModule,
		// DialogModule,
		// ToastModule,
		// ButtonModule,
		// ButtonComponent,
		// RadioButtonModule,
		// CheckboxModule,
		// TabMenuModule,
		// TabViewModule,
		// SafeHtmlPipe,
		ReactiveFormsModule,
		FormsModule,
		FiledInputComponent
		// FiledBooleanComponent,
		// FiledLongtextComponent,
		// FiledCheckboxComponent,
		// FiledRadioComponent,
		// FiledSelectOptionComponent,
	]
})
export class FieldConfigDefaultComponent extends FieldConfigBaseComponent {
	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_DEFAULT_EXTRA

	constructor(protected override readonly _cdr: ChangeDetectorRef) {
		super(_cdr)
	}

	// ************************************************************
	// HANDLE FORM
	// ************************************************************

	/**
	 * @return {void}
	 */
	protected defineColumn(): void {
		if (this.isModePopup === ModePopup.Create) {
			this.formPopup = this._createFormConfig()
		} else {
			this.formPopup = this._editFormConfig(this.formEdit)
		}
		this.isLoading = false
	}

	/**
	 * @return {FormGroup<IFormGroup<FieldDefault>>}
	 */
	private _createFormConfig(): FormGroup<IFormGroup<FieldDefault>> {
		return new FormGroup<IFormGroup<FieldDefault>>({
			InputName: new FormControl<string>('', {
				validators: [Validators.required],
				asyncValidators: [customValidator(this.fields)]
			}),
			Guide: new FormControl<string>(''),
			Question: new FormControl(''),
			IsRequired: new FormControl(false),
			IsReadOnly: new FormControl(false),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldDefault>>({
				ValueDefault: new FormControl(),
				TypeValue: new FormControl(IsValue.ValueDefault),
				DataCMS: new FormControl('')
			})
		})
	}

	/**
	 * @param {FormGroup<IFormGroup<InputBase<any>>>} formEdit
	 * @return {FormGroup<IFormGroup<FieldDefault>>}
	 */
	private _editFormConfig(formEdit: FormGroup<IFormGroup<InputBase<any>>>): FormGroup<IFormGroup<FieldDefault>> {
		return new FormGroup<IFormGroup<FieldDefault>>({
			InputName: new FormControl(formEdit.value?.Name, {
				validators: [Validators.required],
				asyncValidators: [customValidator(this.fields)]
			}),
			Guide: new FormControl(formEdit.value?.Guide),
			Question: new FormControl(formEdit.value?.Question),
			IsRequired: new FormControl(Boolean(formEdit.value?.Required)),
			IsReadOnly: new FormControl(Boolean(!formEdit.value?.AllowEdit)),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldDefault>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				ValueDefault: new FormControl(formEdit.value.DefaultValue.ValueDefault),
				DataCMS: new FormControl(formEdit.value?.DefaultValue?.DataCMS)
			})
		})
	}
}
