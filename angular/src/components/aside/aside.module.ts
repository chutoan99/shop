import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AsideComponent } from './aside.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
@NgModule({
	imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule, RouterModule],
	declarations: [AsideComponent],
	exports: [AsideComponent]
})
export class AsideModule {}
