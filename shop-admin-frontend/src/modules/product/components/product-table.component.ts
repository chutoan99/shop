import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzRateModule } from 'ng-zorro-antd/rate'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzImageModule } from 'ng-zorro-antd/image'
import { ProductService } from '../services'
import { ProductModel } from '../models'

@Component({
	standalone: true,
	selector: 'app-product-table',
	templateUrl: '../templates/product-table.template.html',
	styleUrls: ['../styles/product-table.style.scss'],
	host: {
		'[class.app-product-table]': 'true'
	},
	providers: [ProductService],
	imports: [
		NzRateModule,
		NzDropDownModule,
		NzPaginationModule,
		NzToolTipModule,
		NzProgressModule,
		CommonModule,
		FormsModule,
		RouterModule,
		NzCheckboxModule,
		NzImageModule
	]
})
export class ProductTableComponent {
	@Input() dataSources!: ProductModel[]

	@Output() public editData = new EventEmitter<any>()
	@Output() public addData = new EventEmitter<any>()
	@Output() public removeData = new EventEmitter<any>()
	@Output() public sortData = new EventEmitter<any>()
	@Output() public viewDetail = new EventEmitter<any>()

	protected hoverIndex: number | null = null
	protected hoverHeader: boolean = false
	protected selected = new Set<number>()
	protected allChecked = false

	constructor() {}

	get selectedIds(): number[] {
		return Array.from(this.selected)
	}

	protected onAddData(payload: any) {
		console.log('onAddData', payload)
		this.addData.emit(payload)
	}

	protected onEditData(payload: any, id: number) {
		console.log('onEditData', {
			payload,
			id
		})
		this.editData.emit({
			payload,
			id
		})
	}

	protected onRemoveData(payload: any, id: number) {
		console.log('onRemoveData', {
			payload,
			id
		})
		this.removeData.emit({
			payload,
			id
		})
	}

	protected onSortData(key: string, typeOrder: 'DESC' | 'ASC') {
		console.log('onSortData', {
			key,
			typeOrder
		})
		this.sortData.emit({
			key,
			typeOrder
		})
	}

	protected onViewDetail(id: number) {
		console.log('onViewDetail', id)
		this.viewDetail.emit(id)
	}

 	protected onToggleRow(id: number) {
		if (this.selected.has(id)) {
			this.selected.delete(id)
		} else {
			this.selected.add(id)
		}
		this.updateAllChecked()
	}

	protected onToggleAll() {
		if (this.allChecked) {
			this.selected.clear()
			this.allChecked = false
		} else {
			this.dataSources!.forEach(d => this.selected.add(d.id));
			this.allChecked = true;
		}
	}

	protected updateAllChecked() {
		  this.allChecked = this.dataSources!.length > 0 && this.selected.size === this.dataSources!.length;
	}


}
