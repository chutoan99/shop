import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router'
import { HeaderComponent } from './header.component'

import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuDividerDirective, NzMenuModule } from 'ng-zorro-antd/menu'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzDividerModule } from 'ng-zorro-antd/divider'
@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		NzLayoutModule,
		NzBreadCrumbModule,
		NzMenuModule,
		NzIconModule,
		NzInputModule,
		NzBadgeModule,
		NzAvatarModule,
		NzDropDownModule,
		NzTableModule,
		NzDividerModule,
		HttpClientModule,
		RouterModule
	],
	exports: [HeaderComponent]
})
export class HeaderModule {}
