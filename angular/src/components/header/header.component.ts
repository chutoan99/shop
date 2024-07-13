import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ShopInfoService } from 'src/services/shop/index.service'
import { AppState } from 'src/shared/app.state'
import { getAllSuccess } from 'src/shared/inforShop/inforShop.actions'
import { ShopInfor } from 'src/types/inforShop.model'
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	inforShop!: ShopInfor
	constructor(
		private shopInfoService: ShopInfoService,
		private store: Store<AppState>
	) {}
	ngOnInit(): void {
		this.shopInfoService.getInfoShop().subscribe((res: ShopInfor) => {
			this.store.dispatch(getAllSuccess(res))
			this.inforShop = res
		})
	}
}
