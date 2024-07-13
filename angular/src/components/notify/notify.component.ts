import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
	@Input() title: string = ''
	@Input() content: string = ''
	@Input() orderId: string = ''
	@Input() type: string = ''
	isShowNotify: boolean = true
	ngOnInit() {
		setTimeout(() => {
			this.isShowNotify = false
		}, 5000)
	}
}
