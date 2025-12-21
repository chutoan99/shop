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
	DynamicRadioComponent,
	DynamicSelectOptionComponent
} from 'src/app/shared/field-form/field-field'
import { InputBase } from 'src/app/shared/field-form/models/InputBase'
import { ModePopup, OPTIONS_COUNT, OPTIONS_FILE_TYPE, OPTIONS_SIZE, POPUP_UPLOAD } from '../../../resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

export type ParamsFieldUpload = {
	TypeValue: IsValue
	DataCMS: OptionCms
	FileType: any
	Quantity: any
	Size: any
}

@Component({
	selector: 'app-field-config-upload',
	standalone: true,
	templateUrl: './field-config-upload.component.html',
	styleUrl: './field-config-upload.component.scss',
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
		DynamicSelectOptionComponent
	]
})
export class FieldConfigUploadComponent extends FieldConfigBaseComponent {
	protected readonly optionsCount = OPTIONS_COUNT
	protected readonly optionsSize = OPTIONS_SIZE
	protected readonly optionsFileType = OPTIONS_FILE_TYPE
	protected override readonly tabs = ['Cài đặt', 'Mô tả']
	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_UPLOAD

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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldUpload>>({
				TypeValue: new FormControl(IsValue.ValueDefault),
				DataCMS: new FormControl(''),
				FileType: new FormControl([]),
				Quantity: new FormControl(OPTIONS_COUNT[0]),
				Size: new FormControl(OPTIONS_SIZE[0])
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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldUpload>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				DataCMS: new FormControl(formEdit.value?.DefaultValue?.DataCMS),
				FileType: new FormControl(formEdit.value.DefaultValue.FileType),
				Quantity: new FormControl(formEdit.value.DefaultValue.Quantity),
				Size: new FormControl(formEdit.value.DefaultValue.Size)
			})
		})
	}
}
