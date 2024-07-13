import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommentComponent } from './comment.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

// ng-zoro
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzRateModule } from 'ng-zorro-antd/rate'
@NgModule({
	declarations: [CommentComponent],
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule,
		NzRateModule,
		NzDropDownModule,
		NzPaginationModule,
		NzAvatarModule
	]
})
export class CommentModule {}
