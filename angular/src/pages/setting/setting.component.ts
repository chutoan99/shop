import { Component } from '@angular/core'
import { navigation } from 'src/utils/navs'
import { logoApp } from 'src/utils/orthers'
@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
	navigation: any = navigation
	logoApp: any = logoApp
}
