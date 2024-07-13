import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { OrderComponent } from './order.component'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzTableModule } from 'ng-zorro-antd/table'
@NgModule({
	declarations: [OrderComponent],
	imports: [NzButtonModule, NzTableModule, CommonModule, RouterModule, HttpClientModule, BrowserModule, FormsModule]
})
export class OrderModule {}
