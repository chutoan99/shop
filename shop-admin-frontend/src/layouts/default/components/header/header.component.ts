import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AccountService } from '@modules/account/services'
import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { AccountInfoModel } from '@modules/account/models'
import { LocalStorageService } from '@core/services'
import { AppResource } from '@core/resources'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { StateModal } from '@core/libs/modal/modal.config'
import { ModalComponent } from '@core/libs'
import { ModalService } from '@core/libs/modal/modal.service'
import { NotificationComponent, NotifyModel } from '../notification/notification.component'
@Component({
	providers: [AccountService],
	selector: 'app-header',
	templateUrl: './header.template.html',
	styleUrls: ['./header.style.scss'],
	host: {
		'[class.app-header]': 'true'
	},
	imports: [CommonModule, RouterModule, NzPopoverModule, NzButtonModule, NotificationComponent]
})
export class HeaderComponent implements OnInit {
	@Input() public collapsed: boolean = false
	@Input() public expanded: boolean = false
	@Output() public toggleCollapsed = new EventEmitter<boolean>()
	@Output() public toggleExpanded = new EventEmitter<boolean>()

	protected infoShop!: AccountInfoModel
	protected notificationList: NotifyModel[] | [] = []
	constructor(
		private readonly _modal: ModalService,
		private readonly _accountService: AccountService
	) {}

	ngOnInit(): void {
		this._accountService.getCurrentInfo().subscribe((res: AccountInfoModel) => {
			this.infoShop = res
		})
	}

	protected onToggleCollapsed() {
		this.collapsed = !this.collapsed
		this.toggleCollapsed.emit(this.collapsed)
		LocalStorageService.setItem(AppResource.LOCAL_STORAGE_KEY.HAVE_COLLAPSED, this.collapsed)
	}

	protected onToggleExpand() {
		this.expanded = !this.expanded
		this.toggleExpanded.emit(this.expanded)
		LocalStorageService.setItem(AppResource.LOCAL_STORAGE_KEY.HAVE_EXPANDED, this.expanded)
	}

	protected onSignOut(): void {
		this._modal
			.open(ModalComponent, {
				data: {
					message: 'Sign out',
					content: 'Are you sure you want to sign out now?',
					cancelLabel: 'Cancel',
					confirmLabel: 'Sign out',
					action: 'sign_out'
				}
			})
			.afterClosed()
			.subscribe((result) => {
				if (result === StateModal.confirmed) {
					LocalStorageService.removeItem(AppResource.LOCAL_STORAGE_KEY.ADMIN_TOKEN)
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				}
			})
	}
}
