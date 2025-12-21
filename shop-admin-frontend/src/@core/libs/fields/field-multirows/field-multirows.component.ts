import { CommonModule, NgClass, NgFor, NgIf, NgSwitch } from '@angular/common'
import { Component, Input, ViewChild } from '@angular/core'
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BaseService, CryptoExtension, DataUtilsCore, SafeHtmlPipe } from 'channn-lib'
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ContextMenuModule } from 'primeng/contextmenu'
import { Table, TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Observable, forkJoin } from 'rxjs'
import { ButtonComponent } from '../../../components/button/button.component'
import { ControlFilterDatetimeComponent } from '../../field-filter/control-filter-datetime/control-filter-datetime.component'
import { InputBase } from '../../models/InputBase'
import { InputControlService } from '../../models/InputControlService'
import { FiledBooleanComponent } from '../field-boolean/field-boolean.component'
import { FiledDatetimeComponent } from '../field-datetime/field-datetime.component'
import { FiledImageComponent } from '../field-image/field-image.component'
import { FiledInputComponent } from '../field-input/field-input.component'
import { FiledLongtextComponent } from '../field-long-text/field-long-text.component'
import { FiledNumberIntComponent } from '../field-number-int/field-number-int.component'
import { FiledQuillEditorComponent } from '../field-quill-editor/field-quill-editor.component'
import { FiledRadioComponent } from '../field-radio/field-radio.component'
import { FiledSelectMultipleTreeComponent } from '../field-select-multiple-tree/field-select-multiple-tree.component'
import { FiledSelectMultipleComponent } from '../field-select-multiple/field-select-multiple.component'
import { FiledSelectComponent } from '../field-select/field-select.component'
import { FiledUploadFileComponent } from '../field-upload-file/field-upload-file.component'

@Component({
	selector: 'app-field-multirows',
	standalone: true,
	providers: [ConfirmationService, MessageService, InputControlService],
	templateUrl: './field-multirows.component.html',
	styleUrl: './field-multirows.component.scss',
	imports: [
		CommonModule,
		NgSwitch,
		ReactiveFormsModule,
		FormsModule,
		NgIf,
		NgFor,
		ToastModule,
		ConfirmDialogModule,
		ContextMenuModule,
		TableModule,
		NgClass,
		SafeHtmlPipe,
		ControlFilterDatetimeComponent,
		FiledBooleanComponent,
		FiledInputComponent,
		FiledSelectComponent,
		FiledImageComponent,
		FiledDatetimeComponent,
		FiledRadioComponent,
		FiledNumberIntComponent,
		FiledSelectMultipleComponent,
		FiledLongtextComponent,
		FiledQuillEditorComponent,
		FiledUploadFileComponent,
		FiledSelectMultipleTreeComponent,
		ButtonComponent
	]
})
export class FiledMultirowsComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	@Input() tbname: string
	@Input() moreExp: string
	@Input() idEdit: number
	@Input() paramMore: string = ''
	dataInputBase: InputBase<any>[]
	isMultiRow: boolean = true
	public columnDefs: any[]
	public columnEditDefs: any[]
	public rowsData: any[]
	selectedRowsData: any[] = []
	totalRecords: number
	pageLen: number = 20
	loading: boolean = true
	appImageUrl = ''
	visible_Edit: boolean
	initLoading: boolean = true
	visible_Filter: boolean
	visible_Sidebar: boolean = false
	isLoadNewRow: boolean = false
	title_Edit = ''
	itemsContextMenu: MenuItem[]
	GenTableDefine: any = {}
	lstActionTable: any = {
		insert: false,
		delete: false,
		read: false,
		list: []
	}
	Ref_TbName: string = ''
	Ref_Column: string = ''
	Ref_ColumnRef: string = ''
	public dataDefNewRow: any[]
	private lastTableLazyLoadEvent: LazyLoadEvent
	@ViewChild('dt') table: Table
	constructor(
		private _baseService: BaseService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private ics: InputControlService
	) {}
	ngOnInit() {
		this.Ref_TbName = this.field.Ref_TbName
		this.Ref_Column = this.field.Name
		this.Ref_ColumnRef = this.field.Ref_ColumnName
		this.getDataInit()
	}
	checkExistsColumn(name) {
		if (this.columnDefs.find((x) => x.Name == name)) {
			return true
		}
		return false
	}
	getField() {
		return
	}
	get formArr() {
		return this.form.get(this.Ref_Column) as FormArray
	}
	addNewRow() {
		if (this.dataDefNewRow) {
			this.renderNewRow()
		} else {
			this.getNewRow()
		}
	}
	renderNewRow() {
		if (!this.isLoadNewRow) {
			this.isLoadNewRow = true
			this.dataInputBase = this.ics.defineColumnMultiRow(this.columnEditDefs, this.dataDefNewRow)
			this.field['lstColumn'] = this.dataInputBase
		}
		let form = this.ics.toFormGroup(this.dataInputBase, -1)
		form.controls['ID'].setValue(-1)
		form.controls['state'].setValue(2)
		this.formArr.push(form)
		this.dataInputBase.forEach((col) => {
			form.get(col.Name).valueChanges.subscribe((data) => {
				var valueForm = form.value
				valueForm[col.Name] = data
				this.ics.updateControlValue(col.Name, this.columnEditDefs, form, valueForm, this.dataInputBase)
			})
		})
	}
	renderDataRow(rowsData) {
		rowsData.forEach((row) => {
			let dataInputBase = this.ics.defineColumnMultiRow(this.columnEditDefs, row)
			if (!this.dataInputBase && !this.isLoadNewRow) {
				this.dataInputBase = dataInputBase
				this.field['lstColumn'] = this.dataInputBase
			}
			let form = this.ics.toFormGroup(dataInputBase, -1)
			form.controls['ID'].setValue(row.ID)
			form.controls['state'].setValue(1)
			this.formArr.push(form)
			dataInputBase.forEach((col) => {
				form.get(col.Name).valueChanges.subscribe((data) => {
					var valueForm = form.value
					valueForm[col.Name] = data
					this.ics.updateControlValue(col.Name, this.columnEditDefs, form, valueForm, dataInputBase)
				})
			})
		})
	}
	getNewRow() {
		if (this.paramMore == undefined || this.paramMore == '') {
			this.paramMore = '1=1'
		}
		this._baseService
			.getDataAPI('GetDataEdit', {
				tbname: this.Ref_TbName,
				ID: -1,
				moreExp: CryptoExtension.encryptTable(this.paramMore)
			})
			.subscribe((resp) => {
				if (resp.data.length > 0) {
					resp.data[0]['state'] = 2
					this.dataDefNewRow = resp.data[0]
					this.renderNewRow()
				}
			})
	}
	getDataEdit(): any {
		return this._baseService.getDataAPI('GetDataInfo', {
			tbname: this.Ref_TbName,
			cols: CryptoExtension.encryptTable('*'),
			moreExp: CryptoExtension.encryptTable(`${this.Ref_ColumnRef}=${this.idEdit}`)
		})
	}
	getDataRowdit(): any {
		this._baseService
			.getDataAPI('GetDataInfo', {
				tbname: this.Ref_TbName,
				ID: this.idEdit,
				moreExp: CryptoExtension.encryptTable(this.paramMore)
			})
			.subscribe((resp) => {
				if (resp.data.length > 0) {
					// this.dataDefs = resp.data[0];
					// this.getGenRowDefine();
				}
			})
	}
	resetData() {
		this.columnDefs = []
		this.rowsData = []
		this.loading = true
		this.totalRecords = 0
		this.initLoading = true
	}
	getStyleTableTh(column): object {
		let dataStyle = {
			background: '#f2f2f2'
		}
		if (column.widthColumn) {
			dataStyle['width'] = column.widthColumn
		} else {
			dataStyle['width'] = 'auto'
		}
		return dataStyle
	}
	onResize(event) {
		event.target.innerWidth
		// debugger
	}
	onRowSelect(rowData, col) {
		if (col.VisRef < 2) return
		this.idEdit = rowData.ID
		if (!this.visible_Sidebar) {
			this.visible_Sidebar = true
		}
	}
	// ngOnChanges(changes: SimpleChanges) {
	//     for (let property in changes) {
	//         if (!changes[property].firstChange) {
	//             if (property === 'moreExp') {
	//                 this.re_loadDataRows();
	//             } else if (property === 'tbname') {
	//                 this.resetData();
	//                 this.getDataInit();
	//             }
	//         }
	//     }
	// }
	handleEventRow(dataRow, action) {
		if (action.EventClick.v == 'DeleteRow') {
			this.deleteRow(dataRow)
		} else if (action.EventClick.v == 'EditRow') {
			this.idEdit = dataRow.ID
			this.showEditForm()
		} else if (action.EventClick.v == 'ViewDetailRow') {
			this.visible_Sidebar = true
		}
	}
	onContextMenuSelectRow(dataRows) {
		if (dataRows.data.action.length > 0) {
			let itemsContextMenu = []
			dataRows.data.action.forEach((action) => {
				itemsContextMenu.push({
					label: action.Name.v,
					styleClass: action.CSSClass.v,
					icon: action.ShortCut.v,
					command: () => this.handleEventRow(dataRows.data, action)
				})
			})
			this.itemsContextMenu = itemsContextMenu
		}
	}

	getDataInit() {
		let dataCall = {
			dataGenRow: this.getGenRowDefine()
		}
		if (this.idEdit != -1) {
			dataCall['dataRow'] = this.getDataEdit()
		}
		forkJoin(dataCall).subscribe((resp) => {
			this.renderGenRowDefine(resp.dataGenRow)
			if (this.idEdit == -1) {
				this.rowsData = []
			} else {
				this.renderDataRow(resp['dataRow'].data)
			}
			this.initLoading = false
		})
	}
	renderTableAction(dataGenTable, dataFormAction) {
		let data_GenTable = dataGenTable.data[0]
		let data_FormAction = dataFormAction.data
		if (data_GenTable.ReadOnly) {
			this.lstActionTable.read = true
			this.lstActionTable.insert = false
			this.lstActionTable.delete = false
		} else {
			this.lstActionTable.read = false
			if (data_FormAction.find((x) => x.FormType == 4 && x.EventClick == 'AddNewItem')) {
				this.lstActionTable.insert = true
			}
			if (data_FormAction.find((x) => x.FormType == 4 && x.EventClick == 'DeleteItem')) {
				this.lstActionTable.delete = true
			}
		}
	}
	getGenRowDefine(): any {
		return this._baseService.getDataAPI('GetDataDefineForm_Col_Edit', {
			tbname: this.Ref_TbName,
			isNoConfig: 1
		})
	}
	renderGenRowDefine(resp) {
		resp.data.forEach((cols) => {
			for (const key of Object.keys(cols)) {
				if (cols[key] == null) {
					cols[key] = ''
				}
			}
			cols.tbname = this.tbname
		})
		this.columnEditDefs = [...resp.data]
		this.columnDefs = this.defineColumnTable([...resp.data])
		this.columnEditDefs.push({
			Name: 'ID',
			Class: '',
			DataType: 0,
			AllowNull: true
		})
		this.columnEditDefs.push({
			Name: 'state',
			Class: '',
			DataType: 0,
			AllowNull: true
		})
	}
	getGenTableDefine_FormAction(): any {
		return this._baseService.getDataAPI('GetData_GenTableDefine_FormAction', {
			tbname: this.tbname,
			isNoConfig: 1
		})
	}
	getGenTableDefine(): any {
		return this._baseService.getDataAPI('GetData_GenTableDefine', {
			tbname: this.tbname,
			isNoConfig: 1
		})
	}
	renderGenTableDefine(resp) {
		this.GenTableDefine = resp.data[0]
	}
	defineColumnTable(lstColumn: any) {
		lstColumn = lstColumn.filter((x) => x.Name != 'ID' && x.ID != this.field.RowRefId)
		lstColumn.forEach((column) => {
			let widthColumn = '100%'
			let alignColumn = ''
			let isFilterColumn = true
			if (column.ColumnWidth != null && column.ColumnWidth != '') {
				widthColumn = column.ColumnWidth
			}
			if (column.DataType == 4 || column.DataType == 13 || column.DataType == 2) {
				alignColumn = 'text-center'
			} else if (column.DataType == 11 || column.DataType == 12 || column.DataType == 15) {
				alignColumn = 'text-left'
			} else if (column.DataType == 6) {
				alignColumn = 'text-right'
			}
			if (column.DataType == 13) {
				isFilterColumn = false
			}
			column.alignColumn = alignColumn
			column.widthColumn = widthColumn
			column.Filter_optionList = []
			column.Filter_Selected = []
			column.Filter_isLoading = false
			column.Filter_pageNumber = 0
			column.Filter_totalRow = 0
			column.isFilterColumn = isFilterColumn
		})
		return lstColumn
	}
	loadDataRows(event: LazyLoadEvent) {
		this.lastTableLazyLoadEvent = event
		this.loading = true
		var pageNumber = event.first / event.rows + 1
		var pageLen = event.rows
		var dataFilter: any = {}
		for (var key in event.filters) {
			dataFilter[key] = event.filters[key]['value']
		}
		this._baseService
			.GetDataPaging(
				pageNumber,
				pageLen,
				this.tbname,
				dataFilter,
				event.sortField,
				event.sortOrder,
				this.moreExp,
				'1'
			)
			.subscribe((resp) => {
				this.totalRecords = resp.records
				this.rowsData = resp.data
				this.loading = false
			})
	}
	re_loadDataRows() {
		this.loadDataRows(this.lastTableLazyLoadEvent)
	}
	visibleChangeHandler(data: any) {
		this.visible_Edit = false
	}
	visibleChangeViewFormHandler(data: any) {
		this.visible_Sidebar = false
	}
	addDataForm() {
		this.idEdit = -1
		this.showEditForm()
	}
	showEditForm() {
		if (this.idEdit == -1) {
			this.title_Edit = 'Thêm mới ' + this.GenTableDefine.VnName
		} else {
			this.title_Edit = 'Cập nhật ' + this.GenTableDefine.VnName
		}
		this.visible_Edit = true
	}
	resultSubmitHandler(data: any) {
		this.visible_Edit = false
		this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Lưu dữ liệu thành công' })
		this.re_loadDataRows()
	}
	deleteRow(dataRow) {
		this.confirmationService.confirm({
			message: `Bạn có chắc chắn xóa đối tượng này?`,
			header: 'Cảnh báo xoá dữ liệu',
			icon: 'fas fa-exclamation-triangle text-yellow-500',
			acceptButtonStyleClass: 'bg-red-500 border-0',
			accept: () => {
				let dataRows = [
					{
						ID: dataRow.ID,
						state: 3
					}
				]
				this._baseService
					.getDataAPI('UpdateData', {
						tbname: this.tbname,
						rows: dataRows
					})
					.subscribe((resp) => {
						if (resp.data) {
							this.messageService.add({
								severity: 'success',
								summary: 'Thông báo',
								detail: 'Xóa dữ liệu thành công'
							})
							this.re_loadDataRows()
						}
					})
			},
			reject: (type) => {}
		})
	}
	deleteRows() {
		if (this.selectedRowsData.length == 0) {
			this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng chọn dòng cần xóa' })
			return
		}
		this.confirmationService.confirm({
			message: `Bạn có chắc chắn xóa ${this.selectedRowsData.length} đối tượng?`,
			header: 'Cảnh báo xoá dữ liệu',
			icon: 'fas fa-exclamation-triangle text-yellow-500',
			acceptButtonStyleClass: 'bg-red-500 border-0',
			accept: () => {
				this.selectedRowsData.forEach((row) => {
					row.controls['state'].setValue(3)
				})
			},
			reject: (type) => {}
		})
	}
	onImageError($event) {
		$event.target.src = ``
	}
	detectOnColResize(event) {}
	filterColumn_focusInputField(column) {
		this.filterColumn_GetDataSelect(column, '')
	}
	filterColumn_customSearchFn(item, column) {
		column.Filter_isLoading = false
		this.filterColumn_onCloseSelect(column)
		this.filterColumn_GetDataSelect(column, item.term)
	}
	filterColumn_onScrollToEnd(column) {
		this.filterColumn_GetDataSelect('', column)
	}
	filterColumn_onCloseSelect(column) {
		column.Filter_pageNumber = 0
		column.Filter_pageNumber = 0
		column.Filter_totalRow = 0
		column.Filter_optionList = []
	}
	filterColumn_GetDataSelect(column: any, key: string): Observable<any> {
		if (
			column.Filter_optionList != undefined &&
			column.Filter_optionList.length >= column.Filter_totalRow &&
			column.Filter_totalRow != 0
		) {
			return
		}
		column.Filter_pageNumber += 1
		column.Filter_isLoading = true
		if (column.Filter_Selected == null) {
			column.Filter_Selected = []
		}
		this._baseService
			.GetDataSelect(
				column.ID.toString(),
				column.Filter_pageNumber.toString(),
				key,
				'',
				'',
				column.Filter_Selected
			)
			.subscribe((resp) => {
				column.Filter_isLoading = false
				column.Filter_totalRow = resp.total_count
				if (column.Filter_totalRow < 21) {
					column.Filter_optionList = resp.items
				} else {
					column.Filter_optionList = [...column.Filter_optionList, ...resp.items]
				}
			})
	}
	filterColumn_Change(column) {
		let valueFilter = ''
		if (column.DataType == 8) {
			if (column.Filter_Selected != null) {
				if (column.Filter_Selected.id) {
					valueFilter = column.Filter_Selected.id
				}
			}
		}
		this.table.filter(valueFilter, column.Name, 'startsWith')
	}
	resultSubmitDateTime(data, column) {
		let StartDate = DataUtilsCore.formatDateTime(data.StartDate, 'DD/MM/YYYY')
		let EndDate = DataUtilsCore.formatDateTime(data.EndDate, 'DD/MM/YYYY')
		if (data.TypeActive == null) {
			delete this.table.filters[column.Name]
			this.re_loadDataRows()
		} else {
			this.table.filter(StartDate + '-' + EndDate, column.Name, 'startsWith')
		}
	}
}
