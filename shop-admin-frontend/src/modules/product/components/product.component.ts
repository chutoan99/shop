import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { finalize, Observable, of, tap } from 'rxjs'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzRateModule } from 'ng-zorro-antd/rate'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { ModalService } from '@core/libs/modal/modal.service'
import { StateModal } from '@core/libs/modal/modal.config'
import { ModalComponent } from '@core/libs/modal/modal.component'
import { PopupService } from '@core/libs/popup/popup.service'
import { DynamicQueryBuilderComponent, DynamicQueryBuilderProps } from '@core/libs'
import { ProductService } from '../services'
import { ProductModel } from '../models'
import { ProductDrawerComponent } from './product-drawer.component'
import { FIELDS_CONDITION, PAGE_OPTIONS } from '../resources'
import ProductDto from '../dtos/product.dto'
import { ProductTableState } from '../state/product.state'
import { ProductListComponent } from './product-list.component'
import { ProductTableComponent } from './product-table.component'
export interface TableColumn {
	key?: string
	title: string
	width?: string
	sortable?: boolean
	sortKey?: string
	format?: 'date' | 'currency' | 'text'
	custom?: boolean
}

@Component({
	selector: 'app-product',
	templateUrl: '../templates/product.template.html',
	styleUrls: ['../styles/product.style.scss'],
	host: {
		'[class.app-product]': 'true'
	},
	providers: [ProductService, ProductTableState],
	imports: [
		NzRateModule,
		NzDropDownModule,
		NzPaginationModule,
		NzToolTipModule,
		NzProgressModule,
		CommonModule,
		FormsModule,
		RouterModule,
		ProductListComponent,
		ProductTableComponent,
		ProductDrawerComponent,
		NzDrawerModule,
		NzButtonModule,
		NzCheckboxModule,
		NzImageModule
	]
})
export class ProductComponent {
	@ViewChild('productDrawer') productDrawer!: ProductDrawerComponent

	protected showProgressBar: boolean = false
	protected totalItems: number = 0
	protected dataSources$: Observable<ProductModel[] | []> = of([])
	protected visible = false
	protected currentItemId: number | null = null
	protected readonly pageOptions: number[] = PAGE_OPTIONS
	protected productDto = new ProductDto()
	protected viewDisplay: 'List' | 'Table' = 'List'

	// columns: TableColumn[] = [
	// 	{ key: 'image', title: 'Image', width: '120px' },
	// 	{ custom: true, title: 'ID + Name', width: '400px' }, // custom column, render trực tiếp
	// 	{ key: 'category_name', title: 'Category', width: '150px', sortable: true, sortKey: 'category_name' },
	// 	{ key: 'historicalSold', title: 'Sold', width: '100px', sortable: true, sortKey: 'historical_sold' },
	// 	{ key: 'stock', title: 'Stock', width: '100px', sortable: true, sortKey: 'stock' },
	// 	{ key: 'price', title: 'Price', width: '100px', sortable: true, sortKey: 'price', format: 'currency' },
	// 	{ key: 'discount', title: 'Discount', width: '100px' },
	// 	{ key: 'createdAt', title: 'Created At', width: '125px', format: 'date' },
	// ];

	constructor(
		private readonly _router: Router,
		private readonly _route: ActivatedRoute,
		private readonly _modal: ModalService,
		private readonly _popup: PopupService,
		private readonly _productService: ProductService,
		private readonly _productTableState: ProductTableState
	) {
		this.dataSources$ = of(this._route.snapshot.data['products'])
	}

	ngOnInit(): void {
		this._getTotalItems()

		this._route.queryParams
			.pipe(
				tap((params) => {
					this.productDto.page = Number(params['page'])
					this.productDto.limit = Number(params['limit'])
					this.currentItemId = params['itemId'] ? Number(params['itemId']) : null
				})
			)
			.subscribe()
	}

	protected handleAddData(event: any) {}

	protected handleRemoveData(event: any) {
		if (!event.id) return
		this._openModalDelete(event.id)
	}

	protected handleSortData(event: any) {
		const eventKey = event as keyof ProductDto
		// this.productDto[eventKey] = sort;
	}

	protected handleViewDetail(event: any) {
		this.currentItemId = event.id
		this.visible = true
		this._updateInfoParams()
	}

	/**
	 * @param {string} id
	 * @param {ActionsProduct} action
	 * @param {any} event
	 * @return {void}
	 */
	protected onInputSearch(event: any) {
		const searchEvent = event as Event
		const inputElement = searchEvent.target as HTMLInputElement
		// this.productDto.name = inputElement.value;
		this._updateInfoParams()
	}

	protected onChangePage(event: any) {
		this.productDto.page = event
		this._fetchProducts()
		this._updateInfoParams()
	}

	protected onChangeOption(event: any) {
		this.productDto.limit = event
		this._fetchProducts()
		this._updateInfoParams()
	}

	protected onSearch(): void {
		this._fetchProducts().subscribe()
	}

	/**
	 * @return {void}
	 */

	/**
	 * @return {void}
	 */
	protected onOpenFilter(): void {
		this._popup
			.open(DynamicQueryBuilderComponent, {
				data: {
					title: 'Filter',
					fieldsCondition: FIELDS_CONDITION
				} as DynamicQueryBuilderProps
			})
			.afterClosed()
			.subscribe((result) => {
				console.log(result, 'ccdcdcdcdcdcdc')
			})
	}

	/**
	 * @return {void}
	 */
	protected onCloseDetail(): void {
		this.visible = false
		this._updateInfoParams()
	}

	/**
	 * @return {Observable<ProductModel[]>}
	 */
	private _fetchProducts(): Observable<ProductModel[]> {
		this.showProgressBar = true
		return this._productService.search(this.productDto).pipe(
			tap((data) => (this.dataSources$ = of(data))),
			finalize(() => {
				this.showProgressBar = false
				this._getTotalItems()
			})
		)
	}

	/**
	 * @return {void}
	 */
	private _getTotalItems(): void {
		this._productService.total$.subscribe((total: number) => {
			this.totalItems = total
		})
	}

	/**
	 * @param {string} id
	 * @return {void}
	 */
	private _deleteProduct(id: number): void {
		this.showProgressBar = true
		this._productService
			.deleteProducts(id)
			.pipe(
				finalize(() => {
					this.showProgressBar = false
				})
			)
			.subscribe((_data: any) => {
				this._fetchProducts()
			})
	}

	/**
	 * @return {void}
	 */
	private _updateInfoParams(): void {
		this._router.navigate([], {
			relativeTo: this._route,
			queryParams: {
				page: this.productDto.page,
				limit: this.productDto.limit,
				itemId: this.currentItemId || undefined
			},
			queryParamsHandling: 'merge'
		})
	}

	/**
	 * @param {string} id
	 * @return {void}
	 */
	private _openModalDelete(id: number): void {
		this._modal
			.open(ModalComponent, {
				data: {
					message: 'Delete product?',
					content:
						'Are you sure you want to delete your product? All of your data will be permanently removed. This action cannot be undone',
					cancelLabel: 'Cancel',
					confirmLabel: 'Delete',
					action: 'delete'
				}
			})
			.afterClosed()
			.subscribe((result) => {
				if (result === StateModal.confirmed) {
					return this._deleteProduct(id)
				}
			})
	}
}
