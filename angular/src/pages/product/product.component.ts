import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-home',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	isModal: boolean = false
	isShowGird: boolean = false
	isShowLis: boolean = true
	ngOnInit(): void {}

	onCurrentPageDataChange(e: any): void {
		console.log('chutoan', e)
	}
	onChangeGrid() {
		this.isShowLis = !this.isShowLis
	}
	constructor() {}
}
