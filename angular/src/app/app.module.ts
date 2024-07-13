//? Module
import { NgModule, isDevMode } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RoutingModule } from './routing.module'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { CoreModule } from 'src/shared/store.module'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { SocketioService } from 'src/services/socketio/index.service'
//? Pages
import { AppComponent } from './app.component'
import { ChatModule } from 'src/pages/chat/chat.module'
import { CommentModule } from 'src/pages/comment/comment.module'
import { ShipRouteModule } from 'src/pages/ship-route/ship-route.module'
import { ProductModule } from 'src/pages/product/product.module'
import { HomeModule } from 'src/pages/home/home.module'
import { OrderModule } from 'src/pages/order/order.module'
import { SettingModule } from 'src/pages/setting/setting.module'
import { UserModule } from 'src/pages/user/user.module'
import { DefaultLayoutModule } from 'src/layouts/default/default.module'
import { CustomLayoutModule } from 'src/layouts/custom/custom.module'
import { AuthModule } from 'src/pages/auth/auth.module'

registerLocaleData(en)
@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		BrowserModule,
		ShipRouteModule,
		AuthModule,
		ChatModule,
		UserModule,
		HomeModule,
		ProductModule,
		OrderModule,
		SettingModule,
		RoutingModule,
		RouterModule,
		CommentModule,
		CustomLayoutModule,
		DefaultLayoutModule,
		FormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		EffectsModule.forRoot([])
	],

	providers: [SocketioService, { provide: NZ_I18N, useValue: en_US }],
	bootstrap: [AppComponent]
})
export class AppModule {}
