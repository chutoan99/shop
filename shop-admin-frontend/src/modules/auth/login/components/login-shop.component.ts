import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { BehaviorSubject, concatMap, EMPTY, expand, Observable, of, tap } from 'rxjs'
import { CommonModule } from '@angular/common'
import { AccountService } from '@modules/account/services'
import AccountDto from '@modules/account/dtos/account.dto'
import { AccountInfoModel } from '@modules/account/models/account.model'

@Component({
	selector: 'app-login-shop',
	templateUrl: '../templates/login-shop.template.html',
	styleUrls: ['../styles/login-shop.style.scss'],
	host: {
		'[class.app-login-shop]': 'true'
	},
	imports: [CommonModule]
})
export class LoginShopComponent implements OnInit {
	@Output() currentShop: EventEmitter<AccountInfoModel> = new EventEmitter<AccountInfoModel>()

	protected dataSources$: BehaviorSubject<AccountInfoModel[]> = new BehaviorSubject<AccountInfoModel[]>([])
	protected readonly loading: boolean = false
	protected readonly scrollDistance: number = 2
	protected readonly scrollUpDistance: number = 1
	protected readonly scrollDownDistance: number = 2
	protected readonly throttle: number = 300

	private _isLoading = true
	private _payloadShopDto = new AccountDto()

	constructor(private readonly _accountService: AccountService) {}

	ngOnInit(): void {
		this._startAutoLoad()
	}

	protected onChooseAccount(shop: AccountInfoModel): void {
		this.currentShop.emit(shop)
	}

	/**
	 * @return {Observable<IShop[]>}
	 */
	private _fetchAccountsSample(): Observable<AccountInfoModel[]> {
		return this._accountService.getAccountsSample(this._payloadShopDto)
	}

	/**
	 * @return {Observable<void>}
	 */
	private _startAutoLoad(): void {
		of(null)
			.pipe(
				concatMap(() => this._fetchAccountsSample()),
				expand((data) => {
					if (data.length === 0) {
						this._isLoading = false
						return EMPTY
					}
					this._payloadShopDto.page++
					return this._fetchAccountsSample()
				}),
				tap((data: AccountInfoModel[]) => {
					if (data.length > 0) {
						const currentList = this.dataSources$.getValue()
						const updatedList = [...currentList, ...data]
						this.dataSources$.next(updatedList)

						if (currentList.length === 0) {
							this.onChooseAccount(updatedList[0])
						}
					}
				})
			)
			.subscribe()
	}
}
