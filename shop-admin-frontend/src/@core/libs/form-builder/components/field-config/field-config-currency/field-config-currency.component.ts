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
import { pairwise } from 'rxjs'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import {
	DynamicBooleanComponent,
	DynamicCheckboxComponent,
	DynamicCurrencyComponent,
	DynamicInputComponent,
	DynamicLongtextComponent,
	DynamicRadioComponent,
	DynamicSelectOptionComponent
} from 'src/app/shared/field-form/field-field'
import { InputBase } from 'src/app/shared/field-form/models/InputBase'

import { CURRENCIES, Currency, FORMAT_NUMBER, ModePopup, POPUP_CURRENCY } from '../../../resources'
import {
	customValidator,
	FieldConfigBaseComponent,
	FieldDefault,
	IFormGroup,
	IsValue,
	OptionCms
} from '../field-config-base/field-config-base.component'

type CurrencyExtra = Currency & {
	formatted: string
}

export type ParamsFieldCurrency = {
	TypeValue: IsValue
	ValueDefault: any
	Currency: any
	Format: any
	DataCMS: OptionCms
}

@Component({
	selector: 'app-field-config-currency',
	standalone: true,
	templateUrl: './field-config-currency.component.html',
	styleUrl: './field-config-currency.component.scss',
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
		DynamicCurrencyComponent,
		DynamicSelectOptionComponent
	]
})
export class FieldConfigCurrencyComponent extends FieldConfigBaseComponent {
	protected options: CurrencyExtra[]
	protected readonly formatNumber: any[] = FORMAT_NUMBER
	protected readonly dataInputBase: ReadonlyMap<string, InputBase<any>> = POPUP_CURRENCY

	constructor(
		protected override readonly _baseService: BaseService,
		protected override readonly _cdr: ChangeDetectorRef
	) {
		super(_baseService, _cdr)
		this.options = this._formatCurrencies(Object.values(CURRENCIES))
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
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldCurrency>>({
				TypeValue: new FormControl(IsValue.ValueDefault),
				ValueDefault: new FormControl(null),
				Currency: new FormControl(this.options[0]),
				Format: new FormControl(FORMAT_NUMBER[0]),
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
			IsRequired: new FormControl(Boolean(!formEdit.value?.AllowNull)),
			IsReadOnly: new FormControl(Boolean(!formEdit.value?.AllowEdit)),
			DataTypeSetting: new FormGroup<IFormGroup<ParamsFieldCurrency>>({
				TypeValue: new FormControl(formEdit.value?.DefaultValue?.TypeValue),
				ValueDefault: new FormControl(formEdit.value.DefaultValue.ValueDefault),
				Currency: new FormControl(formEdit.value.DefaultValue.Currency),
				Format: new FormControl(formEdit.value.DefaultValue.Format),
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
			?.get('Currency')
			.valueChanges.pipe(pairwise())
			.subscribe(([prev, next]: [Currency, Currency]) => {
				//* khi thay định dạng tiền tê thì clear giá trị Default
				//* nếu giá trị Currency hiện tại khác với giá trị thay đổi thì mới clear ValueDefault
				if (prev.code !== next.code) {
					this.formPopup.get('DataTypeSetting.ValueDefault')?.setValue(null)
				}
			})

		this.formPopup
			.get('DataTypeSetting')
			?.get('Format')
			.valueChanges.pipe(pairwise())
			.subscribe(([prev, next]: [any, any]) => {
				//* khi thay định dạng thập phân thì clear giá trị Default
				//* nếu giá trị Format hiện tại khác với giá trị thay đổi thì mới clear ValueDefault
				if (prev.type !== next.type) {
					this.formPopup.get('DataTypeSetting.ValueDefault')?.setValue(null)
				}
			})
	}

	// ************************************************************
	// HELPERS
	// ************************************************************

	/**
	 * @param {Currency[]} currencies
	 * @return {CurrencyExtra[]}
	 */
	private _formatCurrencies(currencies: Currency[]): CurrencyExtra[] {
		return currencies.map((currency: Currency) => ({
			...currency,
			formatted: `${currency.code} - ${currency.name} -${currency.symbol}`
		}))
	}
}
