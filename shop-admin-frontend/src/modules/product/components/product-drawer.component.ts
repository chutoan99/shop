import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {} from '@angular/common/http'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { Observable, Subject } from 'rxjs'

@Component({
	selector: 'app-product-drawer',
	templateUrl: '../templates/product-drawer.template.html',
	styleUrls: ['../styles/product-drawer.style.scss'],
	host: {
		'[class.app-product-drawer]': 'true'
	},
	imports: [CommonModule, FormsModule, NzDrawerModule]
})
export class ProductDrawerComponent {
	protected visible = false
	private _stateDrawer = new Subject<boolean>()

	public open(): void {
		this.visible = true
		this._stateDrawer.next(this.visible)
	}

	public close(): void {
		this.visible = false
		this._stateDrawer.next(this.visible)
	}

	/**
	 * @return {Observable<boolean>}
	 */
	public stateDrawer(): Observable<boolean> {
		return this._stateDrawer.asObservable()
	}
}
