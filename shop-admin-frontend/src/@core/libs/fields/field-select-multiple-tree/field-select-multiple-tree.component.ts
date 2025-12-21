import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule } from '@angular/forms'
import { BaseService, CryptoExtension, DataStructTree } from 'channn-lib'
import { TreeSelectModule } from 'primeng/treeselect'
import { InputBase } from '../../models/InputBase'
@Component({
	selector: 'app-field-select-multiple-tree',
	standalone: true,
	imports: [TreeSelectModule, FormsModule, NgIf],
	templateUrl: './field-select-multiple-tree.component.html',
	styleUrl: './field-select-multiple-tree.component.scss'
})
export class FiledSelectMultipleTreeComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	loading: boolean = false
	tbNameRef: string = ''
	colNameRef: any
	colNameRef_Child: any
	colNameRef_ID: any
	dataRefTable: any
	nodes: any[]
	selectedNodes: any
	get isValid() {
		return this.form.controls[this.field.Name].valid
	}
	get isDirty() {
		return this.form.controls[this.field.Name].dirty
	}
	constructor(private _baseService: BaseService) {}
	ngOnInit(): void {
		this.selectedNodes = []
		this.get_TableRowRefDefine()
	}
	get_TableRowRefDefine() {
		this._baseService
			.getDataAPI('GetRefRow_TreeSelect', {
				RowRefId: this.field.RowRefId,
				isNoConfig: 1
			})
			.subscribe((resp) => {
				if (resp.data.length > 0) {
					this.tbNameRef = resp.data[0]['TbName']
					let filterVisRef = resp.data.filter((x) => x.VisRef == 2)
					if (filterVisRef.length > 0) {
						this.colNameRef = filterVisRef[0]
					}
					let filterColumnRef_ID = resp.data.filter((x) => x.Name == 'ID')
					if (filterVisRef.length > 0) {
						this.colNameRef_ID = filterColumnRef_ID[0]
					}
					let filterColumnRef_Child = resp.data.filter((x) => x.RowRefId == this.colNameRef_ID.ID)
					if (filterColumnRef_Child.length > 0) {
						this.colNameRef_Child = filterColumnRef_Child[0]
					}
					this.get_DataTableRowRefDefine()
				}
			})
	}
	get_DataTableRowRefDefine() {
		this._baseService
			.getDataAPI('GetDataInfo', {
				tbname: this.tbNameRef,
				cols: CryptoExtension.encryptTable(
					`ID,1 As SortOrder,${this.colNameRef.Name},${this.colNameRef_Child.Name}`
				),
				isAction: '1',
				isNoConfig: '1',
				moreExp: CryptoExtension.encryptTable('1=1')
			})
			.subscribe((resp) => {
				if (resp.data.length > 0) {
					let data = DataStructTree.list_to_tree(resp.data, this.colNameRef_Child.Name)
					this.nodes = this.buildTree(data)
				}
				this.loading = true
			})
	}
	buildTree(array) {
		array.forEach((item) => {
			item.key = item.ID
			if (!item.Parent_ID) {
				item.expanded = true
			}
			item.label = item[this.colNameRef.Name]
			item.data = item[this.colNameRef.Name]
			if (item.children.length > 0) {
				item.children = item.children.sort((a, b) => parseInt(a.SortOrder.v) - parseInt(b.SortOrder.v))
				this.buildTree(item.children)
			}
			this.set_DefaultValue(item)
		})
		return array
	}
	set_DefaultValue(item) {
		let lstValue = this.form.controls[this.field.Name].value
		if (lstValue.length == 0) {
			return
		}
		let filter = lstValue.filter((x) => x.id == item.ID)
		if (filter.length > 0) {
			this.selectedNodes.push(item)
		}
	}
	onChange(event) {
		var value = []
		if (this.selectedNodes.length > 0) {
			this.selectedNodes.forEach((row) => {
				value.push({
					id: row.ID,
					text: row[this.colNameRef.Name]
				})
			})
		}
		this.form.controls[this.field.Name].setValue(value)
	}
}
