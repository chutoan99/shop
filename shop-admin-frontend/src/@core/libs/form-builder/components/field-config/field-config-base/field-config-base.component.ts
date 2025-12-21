import { CommonModule } from '@angular/common'
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	inject,
	Injector,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core'
import {
	AbstractControl,
	AsyncValidatorFn,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	ValidationErrors
} from '@angular/forms'
import { debounceTime, map, Observable, of, take } from 'rxjs'
import { FieldCondition } from '../../../interfaces'
import { ModePopup } from '../../../resources'
import { StoreConfigComponent } from '../../store-config.components'

export type OptionCms = {
	Id: number
	Name: string
	Value: string
	DataForm: string
}

export enum IsValue {
	ValueDefault,
	RecentData,
	DataCMS
}

export type IFormGroup<T> = {
	[K in keyof T]?: any
}

export type FieldDefault = {
	InputName: string
	Guide: string
	Question: string
	IsRequired: boolean
	IsReadOnly: boolean
	DataTypeSetting: any
}

@Component({
	selector: 'app-field-config-base',
	standalone: true,
	template: '',
	styleUrls: [],
	imports: [
		CommonModule,
		// DialogModule,
		// ToastModule,
		// ButtonModule,
		// ButtonComponent,
		// RadioButtonModule,
		// TabMenuModule,
		// TabViewModule,
		// SafeHtmlPipe,
		ReactiveFormsModule,
		FormsModule
	]
})
export abstract class FieldConfigBaseComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() public isModePopup: ModePopup = ModePopup.Create
	@Input() public header: string = ''
	@Input() public formEdit!: FormGroup
	@Input() public fields!: FieldCondition[] | []
	@Output() public submit: EventEmitter<any> = new EventEmitter()
	@Output() public resultSubmit: EventEmitter<any> = new EventEmitter()

	protected formParent!: StoreConfigComponent
	protected isLoading: boolean = true
	protected visible: boolean = true
	protected isShowRadio: boolean = false
	protected formPopup!: FormGroup
	protected MODE_POPUP: typeof ModePopup = ModePopup
	protected VALUE: typeof IsValue = IsValue
	protected activeItem: string
	protected optionColCMS: OptionCms[] = []
	protected readonly tabs = ['Cài đặt', 'Mô tả', 'Mặc định']

	private readonly _injector: Injector = inject(Injector)

	constructor(protected readonly _cdr: ChangeDetectorRef) {
		this.activeItem = this.tabs[0]
	}

	ngOnChanges(changes: SimpleChanges): void {
		//* remove the field itself from the supported fields
		if (changes['formEdit']) {
			this.fields = changes['fields'].currentValue.filter(
				(f: FieldCondition) => f.Name !== this.formEdit?.value?.VnName
			)
		}
	}

	ngOnInit(): void {
		this.defineColumn()
		// this.formParent = this._injector.get(SidebarDetailSurveyComponent);
	}

	ngAfterViewInit(): void {
		this._cdr.detectChanges()
	}

	/**
	 * @return {void}
	 */
	protected abstract defineColumn(): void

	/**
	 * @return {void}
	 */
	protected onHidePopup(): void {
		this._clearValueForm()
		this.visible = false
		this.resultSubmit.emit({
			data: null,
			type: -2
		})
	}

	/**
	 * @return {void}
	 */
	protected onCheckDefault(e: any): void {
		this.isShowRadio = e.checked
	}

	/**
	 * @param {string} tab
	 * @return {void}
	 */
	protected onChangeTab(tab: string): void {
		this.activeItem = tab
	}

	/**
	 * @return {void}
	 */
	protected saveData(): void {
		if (this.formPopup.valid) {
			this._createField()
			this._clearValueForm()
		}
	}

	/**
	 * @return {void}
	 */
	protected _clearValueForm(): void {
		// this.formPopup = null;
		// this.formEdit = null;
		this.isModePopup = ModePopup.Create
	}

	/**
	 * @return {void}
	 */
	private _createField(): void {
		// const group: Group = this.formParent['groups'][0];
		// const newGroupName =
		//   this.formParent['groups'].find((g: Group) => g.groupCode === this.formParent['targetGroupId'])?.groupName ||
		//   group.groupName;
		// const newGroupCode = this.formParent['targetGroupId'] || group.groupCode;
		// this.submit.emit({
		//   ID: new Date().toISOString(),
		//   Name: ulid(),
		//   Class: '',
		//   Question: this.formPopup.value?.Question,
		//   ControlType: this.formParent['draggedField']?.ControlType,
		//   DefaultValue: this.formPopup.value?.DataTypeSetting,
		//   VnName: this.formPopup.value?.InputName,
		//   AllowNull: !this.formPopup.value?.IsRequired,
		//   AllowEdit: !this.formPopup.value?.IsReadOnly,
		//   Guide: this.formPopup.value?.Guide,
		//   tbname: CONSTANT.SURVEY.TB_NAME,
		//   HasCondition: false,
		//   GroupName: newGroupName,
		//   GroupCode: newGroupCode,
		//   Conditions: '',
		//   Value: '',
		// });
	}
}

export function customValidator(fields: FieldCondition[]): AsyncValidatorFn {
	const fieldsName = fields.map((f: FieldCondition) => f.Name)
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		if (!control.value) {
			return of(null)
		}
		return of(control.value).pipe(
			debounceTime(300),
			take(1),
			map((value) => {
				if (fieldsName.length === 0) return null

				console.log(fieldsName, ' validation fieldsName')

				if (fieldsName.includes(value)) {
					return { customError: 'Trường đã tồn tại' }
				}

				return null
			})
		)
	}
}
