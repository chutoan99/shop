import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BaseService, CryptoExtension } from 'channn-lib'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TypeConfig } from 'src/app/modules/survey/resources'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-radio',
	standalone: true,
	host: { class: 'field-radio' },
	imports: [ReactiveFormsModule, FormsModule, RadioButtonModule, CommonModule],
	templateUrl: './field-radio.component.html',
	styleUrl: './field-radio.component.scss'
})
export class FiledRadioComponent implements OnInit {
	@Input() public field!: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	@Input() public optionList: string[] = []
	@Input() public isMultiple: boolean = false
	@Input() public label: string = ''
	@Input() public selectedItem: any

	constructor(
		private readonly _baseService: BaseService,
		private readonly _cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		if (
			this.field?.DefaultValue?.TableReference?.RowRefID_Name &&
			this.field?.DefaultValue?.ConfigType === TypeConfig.Reference
		) {
			this._getOptionTable(this.field?.DefaultValue?.TableReference)
		}
	}

	/**
	 * @param {string} table
	 * @return {void}
	 */
	private _getOptionTable(param: any): void {
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
					//* clear previously selected values
					this.optionList.length = 0
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
}
