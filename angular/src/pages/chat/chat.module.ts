import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatComponent } from './chat.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

// Module

@NgModule({
	declarations: [ChatComponent],
	imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule, RouterModule]
})
export class ChatModule {}
