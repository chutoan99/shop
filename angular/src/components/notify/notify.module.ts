import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router'
import { NotifyComponent } from './notify.component'

@NgModule({
	imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule, RouterModule],
	declarations: [NotifyComponent],
	exports: [NotifyComponent]
})
export class NotifyModule {}
