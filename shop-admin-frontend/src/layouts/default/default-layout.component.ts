import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AsideComponent } from './components/aside/aside.component'
import { NotifyComponent } from '@core/libs/notify/notify.component'
import { HeaderComponent } from './components/header/header.component'
import { LocalStorageService } from '@core/services'
import { AppResource } from '@core/resources'
import { ThemeSettingDrawerComponent } from './components/theme-setting-drawer/theme-setting-drawer.component'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { IThemeColor, IThemeMode, THEME_COLORS, THEME_MODES, ThemeColor, ThemeMode } from './resources/theme-setting.resource'

@Component({
	selector: 'app-default-layout',
	templateUrl: './default-layout.template.html',
	styleUrls: ['./default-layout.style.scss'],
	host: {
		'[class.app-default-layout]': 'true'
	},
	imports: [
		CommonModule,
		RouterModule,
		AsideComponent,
		NotifyComponent,
		HeaderComponent,
		ThemeSettingDrawerComponent,
		NzDrawerModule
	]
})
export class DefaultLayoutComponent {
	@ViewChild('themeSettingDrawer') themeSettingDrawer!: ThemeSettingDrawerComponent

	protected collapsed!: boolean
	protected expanded!: boolean
	protected visible!: boolean

	protected currentThemeColor!: IThemeColor
	protected currentThemeMode!: IThemeMode

	constructor() {
		this.collapsed = (LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.HAVE_COLLAPSED) as boolean) ?? true
		this.expanded = (LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.HAVE_EXPANDED) as boolean) ?? true
		this.currentThemeColor =
			(LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.THEME_COLOR) as IThemeColor) ??
			THEME_COLORS.get(ThemeColor.BlueTheme)

		this.currentThemeMode =
			(LocalStorageService.getItem(AppResource.LOCAL_STORAGE_KEY.THEME_MODE) as IThemeMode) ??
			THEME_MODES.get(ThemeMode.LightTheme)
	}

	protected handleToggleCollapsed(event: boolean) {
		this.collapsed = event
	}

	protected handleToggleExpanded(event: boolean) {
		this.expanded = event
	}

	protected handleChangeThemeMode(event: IThemeMode) {
		this.currentThemeMode = event
	}

	protected handleChangeThemeColor(event: IThemeColor) {
		this.currentThemeColor = event
	}

	/**
	 * @return {void}
	 */
	protected onOpenSetting(): void {
		this.visible = true
	}

	/**
	 * @return {void}
	 */
	protected onCloseSetting(): void {
		this.visible = false
	}
}
