import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
export interface NotifyModel {
	id: string
	title: string
	content: string
	image: string
	seen: boolean
}

@Component({
	selector: 'app-header-notification',
	standalone: true,
	templateUrl: './notification.template.html',
	styleUrls: ['./notification.style.scss'],
	host: {
		'[class.app-header-notification]': 'true'
	},
	imports: [CommonModule, RouterModule, NzEmptyModule]
})
export class NotificationComponent {
	@Input() dataSources: NotifyModel[] = []
}
