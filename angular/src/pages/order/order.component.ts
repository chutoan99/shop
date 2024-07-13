import { Component, OnInit } from '@angular/core'
export interface Data {
	id: number
	name: string
	age: number
	address: string
}
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
	checked = false
	loading = false
	indeterminate = false
	listOfData: readonly Data[] = []
	listOfCurrentPageData: readonly Data[] = []
	setOfCheckedId = new Set<number>()

	updateCheckedSet(id: number, checked: boolean): void {
		if (checked) {
			this.setOfCheckedId.add(id)
		} else {
			this.setOfCheckedId.delete(id)
		}
	}

	onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
		this.listOfCurrentPageData = listOfCurrentPageData
		this.refreshCheckedStatus()
	}

	refreshCheckedStatus(): void {
		const listOfEnabledData = this.listOfCurrentPageData
		this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id))
		this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked
	}

	onItemChecked(id: number, checked: boolean): void {
		this.updateCheckedSet(id, checked)
		this.refreshCheckedStatus()
	}

	onAllChecked(checked: boolean): void {
		this.listOfCurrentPageData.forEach(({ id }) => this.updateCheckedSet(id, checked))
		this.refreshCheckedStatus()
	}

	ngOnInit(): void {
		this.listOfData = new Array(100).fill(0).map((_, index) => ({
			id: index,
			name: `Edward King ${index}`,
			age: 32,
			address: `London, Park Lane no. ${index}`
		}))
	}
}
