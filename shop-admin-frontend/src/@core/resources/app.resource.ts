import { LocalStorageService } from '@core/services/local-storage.service'
import { environment } from '@environments/environment'

export class AppResource {
	static BASE_URL = AppResource.loadEnvironment('base_url')
	static APP_URL = AppResource.loadEnvironment('app_url')
	static SOCKET_URL = AppResource.loadEnvironment('socket_url')

	static LOCAL_STORAGE_KEY = {
		ADMIN_TOKEN: 'admin-token',
		HAVE_COLLAPSED: 'collapsed',
		HAVE_EXPANDED: 'expanded',
		THEME_MODE: 'them_mode',
		THEME_COLOR: 'them_color'
	}

	static loadEnvironment(key: keyof typeof environment) {
		if (!environment.production) {
			const overrideEnv = LocalStorageService.getItem('environment')
			if (overrideEnv) {
				return overrideEnv[key] ?? environment[key]
			}
		}
		return environment[key]
	}
}
