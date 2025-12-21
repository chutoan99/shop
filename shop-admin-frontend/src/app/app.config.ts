import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig, isDevMode, importProvidersFrom, inject } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'
import { routes } from './app.routes'
import { StoreClientModule } from './store.module'
import { ForbiddenInterceptor } from './interceptors/forbidden.interceptor'

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(routes),
		importProvidersFrom(
			BrowserAnimationsModule,
			StoreClientModule,
			StoreModule.forRoot({}),
			StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
			EffectsModule.forRoot([])
		),
		{ provide: NZ_I18N, useValue: en_US }
	]
}
