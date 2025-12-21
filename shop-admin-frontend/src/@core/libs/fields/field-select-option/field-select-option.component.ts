import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { BaseService, CryptoExtension, SafeHtmlPipe } from 'channn-lib'
import { Observable, Subject } from 'rxjs'
import { TypeConfig } from 'src/app/modules/survey/resources'
import { InputBase } from '../../models/InputBase'
import { InputControlService } from '../../models/InputControlService'

@Component({
	selector: 'app-field-select-option',
	standalone: true,
	host: { class: 'field-select-option' },
	imports: [NgSelectModule, NgClass, NgIf, ReactiveFormsModule, FormsModule, SafeHtmlPipe],
	templateUrl: './field-select-option.component.html',
	styleUrl: './field-select-option.component.scss'
})
export class FiledSelectOptionComponent implements OnChanges {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	@Input() public optionList: any[] = []
	@Input() public selectedItem: any
	@Input() public bindLabel: string = ''
	@Input() public useIcon: boolean = false

	protected searchInput$ = new Subject<string>()
	protected isLoading = false
	protected optionList$: Observable<string[]>
	constructor(
		private readonly _baseService: BaseService,
		private readonly _inputControlService: InputControlService,
		private readonly _cdr: ChangeDetectorRef
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['optionList']) {
			this.optionList = changes['optionList'].currentValue
		}
	}

	ngOnInit(): void {
		if (
			this.field?.DefaultValue?.TableReference?.RowRefID_Name &&
			this.field?.DefaultValue?.ConfigType === TypeConfig.Reference
		) {
			const param = {
				More: this.field?.DefaultValue?.TableReference?.More || '1=1',
				TbName: this.field?.DefaultValue?.TableReference?.TbName,
				RowRefID_Name: this.field?.DefaultValue?.TableReference?.RowRefID_Name
			}

			this._getOptionTable(param)
		}
		this.changeRefExp()
	}

	/**
	 * @param {string} table
	 * @return {void}
	 */
	private _getOptionTable(param: any): void {
		this._baseService
			.getDataAPI('GetDataInfo', {
				tbname: param.TbName,
				moreExp: CryptoExtension.encryptTable(param.More),
				cols: CryptoExtension.encryptTable(`ID,${param.RowRefID_Name}`),
				isAction: '0',
				isNoConfig: '1'
			})
			.subscribe({
				next: (resp) => {
					if (!resp.data) return
					//* clear previously selected values

					this.optionList = resp.data.map((item: any, index: number) => ({
						OptionID: item.ID,
						SortOrder: index,
						OptionInputName: item[param.RowRefID_Name]
					}))
					this._cdr.detectChanges()
				},
				error: (err) => {
					console.log(err)
				}
			})
	}

	/**
	 * @return {void}
	 */
	private changeRefExp(): void {
		this._inputControlService.conditionChanged.subscribe((res: InputBase<any>) => {
			if (this.field.Name === res.Name && res?.DefaultValue?.ConfigType === TypeConfig.Reference) {
				const param = {
					More: res.RefExp,
					TbName: res?.DefaultValue?.TableReference?.TbName,
					RowRefID_Name: res?.DefaultValue?.TableReference?.RowRefID_Name
				}
				this.optionList.length = 0
				this.form.get(this.field.VnName).setValue(null, { emitEvent: false })
				this._getOptionTable(param)
			}
		})
	}
}
