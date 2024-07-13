import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { SettingComponent } from './setting.component'

@NgModule({
	declarations: [SettingComponent],
	imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule, RouterModule]
})
export class SettingModule {}
