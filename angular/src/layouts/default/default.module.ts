//? Apps
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { DefaultComponent } from './default.component'
import { AsideModule } from 'src/components/aside/aside.module'
import { NotifyModule } from 'src/components/notify/notify.module'
import { HeaderModule } from 'src/components/header/header.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule,
		AsideModule,
		NotifyModule,
		HeaderModule
	],
	declarations: [DefaultComponent]
})
export class DefaultLayoutModule {}
