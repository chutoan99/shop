import { CommonModule } from '@angular/common'
// Module
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './modules/login/components/login.component'

// Module
@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule]
})
export class AuthModule {}
