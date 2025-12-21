import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaseService, CryptoExtension, SafeHtmlPipe } from 'channn-lib'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
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
	DynamicRadioComponent,
	DynamicSelectMultipleOptionComponent,
	DynamicSelectOptionComponent
} from 'src/app/shared/field-form/field-field'
import { InputBase } from 'src/app/shared/field-form/models/InputBase'
import { ControlType } from 'src/app/shared/interfaces'
import { _ } from 'src/app/shared/utils'
import { ulid, UUID } from 'ulidx'
import {
	DisplayValueSelectType,
	ModePopup,
	OPTIONS_SELECT,
	POPUP_SELECT,
	TypeConfig,
	TypeSelect
} from '../../../resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

export type IOptionSelect = {
	OptionID: UUID
	SortOrder: number
	OptionInputName: string
}

export type ParamsFieldSelect = {
	TypeValue: IsValue
	DataCMS: OptionCms
	Type: any
	ListOption: IOptionSelect[]
	ListOptionDefault: IOptionSelect[]
	ValueDefault: IOptionSelect
	TypeSelect: TypeSelect
	DisplayValueSelectType: DisplayValueSelectType
	ConfigType: TypeConfig
	TableReference: any
}

enum ActionFieldSelect {
	RemoveOption,
	AddOption,
	MoveOption
}

@Component({
	selector: 'app-field-config-select',
	standalone: true,
	templateUrl: './field-config-select.component.html',
	styleUrl: './field-config-select.component.scss',
	imports: [
		NgIf,
		NgClass,
		FormsModule,
		DialogModule,
		ToastModule,
		DragDropModule,
		DropdownModule,
		MultiSelectModule,
		ButtonModule,
		CommonModule,
		TabMenuModule,
		TabViewModule,
		SafeHtmlPipe,
		CheckboxModule,
		ButtonComponent,
		ConfirmPopupModule,
		RadioButtonModule,
		ReactiveFormsModule,
		DynamicInputComponent,
		DynamicBooleanComponent,
		DynamicLongtextComponent,
		DynamicCheckboxComponent,
		DynamicRadioComponent,
		DynamicSelectOptionComponent,
		ConfirmDialogModule,
		DynamicSelectMultipleOptionComponent
	]
})
export class FieldConfigSelectComponent extends FieldConfigBaseComponent {
	protected modeConfig: boolean = false
	protected tables: any[] = []
	protected optionsInputBase: InputBase<any>[] = [...OPTIONS_SELECT]

	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_SELECT
	protected readonly TYPE_SELECT: typeof TypeSelect = TypeSelect
	protected readonly TYPE_CONFIG: typeof TypeConfig = TypeConfig
	protected readonly DISPLAY_VALUE_SELECT_TYPE: typeof DisplayValueSelectType = DisplayValueSelectType
	protected readonly ACTION_FIELD_SELECT: typeof ActionFieldSelect = ActionFieldSelect

	protected get options(): FormArray<FormGroup<IFormGroup<IOptionSelect>>> {
		return this.formPopup.get('DataTypeSetting').get('ListOption') as FormArray<
			FormGroup<IFormGroup<IOptionSelect>>
		>
	}

	constructor(
		protected override readonly _baseService: BaseService,
		protected override readonly _cdr: ChangeDetectorRef,
		private readonly _messageService: MessageService,
		private readonly _confirmationService: ConfirmationService
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
			this.options.push(this._createOptionForm())
		} else {
			this.formPopup = this._editFormConfig(this.formEdit)
			//* clear manual mode values
			this.optionsInputBase.length = 0
			this.options.controls.length = 0
			if (this.formEdit.value.DefaultValue?.ListOption?.length > 0) {
				this.formEdit.value.DefaultValue?.ListOption?.map((option: any, index: number) => {
					this.optionsInputBase.push(this._createOptionField())
					const control = new FormGroup<IFormGroup<IOptionSelect>>({
						OptionID: new FormControl(option.OptionID),
						SortOrder: new FormControl(option.SortOrder),
						OptionInputName: new FormControl(option.OptionInputName)
					})
					this.options.push(control)
				})
			}

			if (this.formEdit.value.DefaultValue?.ConfigType === TypeConfig.Reference) {
				this._getTableReference()
			}

			if (this.formEdit.value?.DefaultValue?.TypeValue === IsValue.DataCMS) {
				this.getColumnCMS()
			}
		}

		this.isLoading = false
	}

	/**
	 * @param {Field} field
	 * @return {InputBase<any>}
	 */
	private _createOptionField(): InputBase<any> {
		return new InputBase({
			CellData: '',
			DataCol: {
				ID: '',
				ControlType: ControlType.Select,
				DefaultValue: '',
				VnName: 'Nhập giá trị',
				AllowNull: false,
				Name: 'OptionInputName',
				Class: '',
				AllowEdit: true
			}
		})
	}

	/**
	 * @param {InputBase<any>} form
	 * @return {FormGroup<IFormGroup<IOptionSelect>>}
	 */
	private _createOptionForm(): FormGroup<IFormGroup<IOptionSelect>> {
		return new FormGroup<IFormGroup<IOptionSelect>>({
			OptionID: new FormControl(ulid()),
			SortOrder: new FormControl(this.options.value.length + 1),
			OptionInputName: new FormControl(
				'',
				this.options.value.length == 0 && {
					validators: [Validators.required]
				}
			)
		})
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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldSelect>>({
				TypeValue: new FormControl(IsValue.ValueDefault),
				DataCMS: new FormControl(''),
				ListOption: new FormArray<FormGroup<IFormGroup<IOptionSelect>>>([]), // dành cho chế độ select
				ListOptionDefault: new FormControl(), // dành cho chế độ multi select
				ValueDefault: new FormControl(),
				TypeSelect: new FormControl(TypeSelect.Select),
				DisplayValueSelectType: new FormControl(DisplayValueSelectType.Select),
				ConfigType: new FormControl(TypeConfig.Manual),
				TableReference: new FormControl(null)
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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldSelect>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				DataCMS: new FormControl(formEdit.value?.DefaultValue?.DataCMS),
				ListOption: new FormArray<FormGroup<IFormGroup<IOptionSelect>>>([]),
				ListOptionDefault: new FormControl(formEdit.value.DefaultValue?.ListOptionDefault || []), // dành cho chế độ multi select
				ValueDefault: new FormControl(formEdit.value.DefaultValue?.ValueDefault || null),
				TypeSelect: new FormControl(formEdit.value.DefaultValue?.TypeSelect),
				DisplayValueSelectType: new FormControl(formEdit.value.DefaultValue?.DisplayValueSelectType),
				ConfigType: new FormControl(formEdit.value.DefaultValue?.ConfigType),
				TableReference: new FormControl(formEdit.value.DefaultValue?.TableReference)
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

		//* Value mode change
		this.formPopup
			.get('DataTypeSetting')
			?.get('ConfigType')
			.valueChanges.subscribe((type: TypeConfig) => {
				if (type === TypeConfig.Reference) {
					if (
						this.options.controls[0]?.value?.OptionInputName !== '' &&
						this.optionsInputBase.length > 0 &&
						this.options.controls.length > 0
					) {
						this._confirm()
					} else {
						this._getTableReference()
					}
				}
			})

		this.formPopup
			.get('DataTypeSetting')
			?.get('TypeSelect')
			.valueChanges.pipe(pairwise())
			.subscribe(([prev, next]: [any, any]) => {
				if (prev !== next) {
					switch (next) {
						case TypeSelect.Select:
							this.formPopup.get('DataTypeSetting')?.get('ListOptionDefault')?.setValue([])
							break
						case TypeSelect.MultipleSelect:
							this.formPopup.get('DataTypeSetting')?.get('ValueDefault')?.setValue(null)
							break
					}
				}
			})

		//* Value Table Reference change
		this.formPopup
			.get('DataTypeSetting')
			.get('TableReference')
			.valueChanges.subscribe((value: any) => {
				this._getOptionTable(value)
			})
	}

	// ************************************************************
	// HANDLE ACTION
	// ************************************************************
	/**
	 * @param {Field} field
	 * @return {void}
	 */
	private _createOption(): void {
		this.optionsInputBase.push(this._createOptionField())
		this.options.push(this._createOptionForm())
	}

	/**
	 * @param {number} index
	 * @return {void}
	 */
	private _removeOption(index: number): void {
		if (this.optionsInputBase.length === 1 && this.options.controls.length === 1) return
		this.optionsInputBase.splice(index, 1)
		this.options.controls.splice(index, 1)
	}

	/**
	 * @param {CdkDragDrop<string[]>} event
	 * @return {void}
	 */
	private _moveOption(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.optionsInputBase, event.previousIndex, event.currentIndex)
		_.moveItemInFormArray(this.options, event.previousIndex, event.currentIndex)
	}

	/**
	 * @param {number} index
	 * @param {ActionFieldSelect} action
	 * @param {any} event
	 * @return {void}
	 */
	protected onHandleAction(event: any, action: ActionFieldSelect, index?: number): void {
		switch (action) {
			case ActionFieldSelect.AddOption:
				return this._createOption()
			case ActionFieldSelect.RemoveOption:
				return this._removeOption(index)
			case ActionFieldSelect.MoveOption:
				return this._moveOption(event as CdkDragDrop<string[]>)
		}
	}

	// ************************************************************
	// HANDLE API
	// ************************************************************

	/**
	 * @return {void}
	 */
	private _getTableReference(): void {
		this._baseService
			.getDataAPI('GetDataInfo', {
				tbname: CryptoExtension.encryptTable('vw_tb_Process_Config_RowRefID'),
				moreExp: CryptoExtension.encryptTable(`1=1`),
				cols: CryptoExtension.encryptTable(`ID,Name,TbName,RowRefID_Name,More,DefaultValue`),
				isAction: '0',
				isNoConfig: '1'
			})
			.subscribe({
				next: (resp) => {
					if (!resp.data) return
					this.tables = resp.data
				},
				error: (err) => {
					console.log(err)
				}
			})
	}

	/**
	 * @param {string} table
	 * @return {void}
	 */
	private _getOptionTable(param: any): void {
		if (!param.TbName && !param.RowRefID_Name) return

		this._baseService
			.getDataAPI('GetDataInfo', {
				tbname: param.TbName,
				moreExp: CryptoExtension.encryptTable(`1=1`),
				cols: CryptoExtension.encryptTable(`ID,${param.RowRefID_Name}`),
				isAction: '0',
				isNoConfig: '1'
			})
			.subscribe({
				next: (resp) => {
					if (!resp.data) return
					this.options.controls.length = 0
					this.formPopup.get('DataTypeSetting')?.get('ListOption')?.setValue([])
					this.formPopup.get('DataTypeSetting')?.get('ListOptionDefault')?.setValue([])
					this.formPopup.get('DataTypeSetting')?.get('ValueDefault')?.setValue(null)
					//* clear previously selected values
					this._cdr.markForCheck()
				},
				error: (err) => {
					console.log(err)
				}
			})
	}

	// ************************************************************
	// HELPERS
	// ************************************************************

	/**
	 * @param {Event} event
	 * @return {void}
	 */
	private _confirm(): void {
		this._confirmationService.confirm({
			header: 'Bạn sẽ mất các dữ liệu hiện có',
			message: 'Những dữ liệu bạn đã tạo sẽ bị mất. Bạn có muốn tiếp tục?',
			icon: 'fas fa-exclamation-triangle text-yellow-500',
			rejectButtonStyleClass: 'bg-primary text-primary-foreground p-2 mr-2',
			acceptButtonStyleClass: 'bg-red-500 p-2 text-white',
			acceptIcon: 'none',
			rejectIcon: 'none',
			accept: () => {
				this._getTableReference()
				//* clear manual mode values
				this.optionsInputBase = [...OPTIONS_SELECT]
				this.options.clear()
				this.options.push(this._createOptionForm())
			},
			reject: () => {
				this.formPopup.get('DataTypeSetting')?.get('ConfigType').setValue(TypeConfig.Manual)
			}
		})
	}

	/**
	 * @return {void}
	 */
	protected override _clearValueForm(): void {
		this.optionsInputBase = OPTIONS_SELECT
		this.formPopup = undefined
		this.formEdit = null
		this.isModePopup = ModePopup.Create
	}
}
