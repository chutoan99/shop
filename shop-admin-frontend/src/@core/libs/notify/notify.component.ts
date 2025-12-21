import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-notify',
	templateUrl: './notify.template.html',
	styleUrls: ['./notify.style.scss'],
	host: {
		'[class.app-notify]': 'true'
	},
	imports: [CommonModule, RouterModule]
})
export class NotifyComponent implements OnInit {
	@Input() public title: string = ''
	@Input() public content: string = ''
	@Input() public orderId: string = ''
	@Input() public type: string = ''

	protected isShowNotify: boolean = true

	ngOnInit() {
		setTimeout(() => {
			this.isShowNotify = false
		}, 5000)
	}
}
