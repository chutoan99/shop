import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaseService, SafeHtmlPipe } from 'channn-lib'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TabMenuModule } from 'primeng/tabmenu'
import { TabViewModule } from 'primeng/tabview'
import { ToastModule } from 'primeng/toast'
import { pairwise } from 'rxjs'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import {
	DynamicBooleanComponent,
	DynamicCheckboxComponent,
	DynamicInputComponent,
	DynamicLongtextComponent,
	DynamicNumberFloatComponent,
	DynamicNumberIntComponent,
	DynamicNumberPercentComponent,
	DynamicRadioComponent,
	DynamicSelectOptionComponent
} from 'src/app/shared/field-form/field-field'
import { InputBase } from 'src/app/shared/field-form/models/InputBase'
import { ModePopup, OptionNumber, OPTIONS_NUMBER, POPUP_NUMBER } from '../../../resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

export type ParamsFieldNumber = {
	ValueDefault: any
	TypeValue: IsValue
	DataCMS: OptionCms
	Type: any
}

@Component({
	selector: 'app-field-config-number',
	standalone: true,
	templateUrl: './field-config-number.component.html',
	styleUrl: './field-config-number.component.scss',
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
		DropdownModule,
		TabMenuModule,
		TabViewModule,
		SafeHtmlPipe,
		DynamicInputComponent,
		DynamicBooleanComponent,
		DynamicLongtextComponent,
		DynamicCheckboxComponent,
		DynamicRadioComponent,
		DynamicNumberIntComponent,
		DynamicNumberFloatComponent,
		DynamicSelectOptionComponent,
		DynamicNumberPercentComponent
	]
})
export class FieldConfigNumberComponent extends FieldConfigBaseComponent {
	protected options: any[] = OPTIONS_NUMBER
	protected readonly OPTIONS_NUMBER: typeof OptionNumber = OptionNumber
	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_NUMBER

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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldNumber>>({
				TypeValue: new FormControl(IsValue.ValueDefault),
				ValueDefault: new FormControl(),
				Type: new FormControl<{ text: string; type: number }>(OPTIONS_NUMBER[0]),
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
			InputName: new FormControl(formEdit.value?.VnName, {
				validators: [Validators.required]
			}),
			Guide: new FormControl(formEdit.value?.Guide),
			Question: new FormControl(formEdit.value?.Question),
			IsRequired: new FormControl<boolean>(Boolean(!formEdit.value?.AllowNull)),
			IsReadOnly: new FormControl<boolean>(Boolean(!formEdit.value?.AllowEdit)),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldNumber>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				ValueDefault: new FormControl(formEdit.value.DefaultValue.ValueDefault),
				Type: new FormControl<{ text: string; type: number }>(formEdit.value.DefaultValue.Type),
				DataCMS: new FormControl(formEdit.value?.DefaultValue?.DataCMS)
			})
		})
	}

	/**
	 * @return {void}
	 */
	protected override _changeValue(): void {
		this.formPopup
			.get('DataTypeSetting')
			.get('TypeValue')
			?.valueChanges.subscribe((value: IsValue) => {
				if (value === IsValue.DataCMS) {
					this.getColumnCMS()
				}
			})

		this.formPopup
			.get('DataTypeSetting')
			?.get('Type')
			.valueChanges.pipe(pairwise())
			.subscribe(([prev, next]: [any, any]) => {
				//* nếu giá trị type hiện tại khác với giá trị thay đổi thì mới clear ValueDefault
				if (prev.type !== next.type) {
					this.formPopup.get('DataTypeSetting.ValueDefault')?.setValue(null)
				}
			})
	}
}
