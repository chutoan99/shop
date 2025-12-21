import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import {
	IThemeColor,
	IThemeMode,
	THEME_COLORS,
	THEME_MODES,
	ThemeColor,
	ThemeMode
} from '@layouts/default/resources/theme-setting.resource'
import { LocalStorageService } from '@core/services'
import { AppResource } from '@core/resources'

@Component({
	selector: 'app-theme-setting-drawer',
	templateUrl: './theme-setting-drawer.template.html',
	styleUrls: ['./theme-setting-drawer.style.scss'],
	host: {
		'[class.app-theme-setting-drawer]': 'true'
	},
	imports: [CommonModule, RouterModule]
})
export class ThemeSettingDrawerComponent implements OnChanges {
	@Input() public currentThemeColor!: IThemeColor
	@Input() public currentThemeMode!: IThemeMode

	@Output() public changeThemeMode = new EventEmitter<IThemeMode>()
	@Output() public changeThemeColor = new EventEmitter<IThemeColor>()

	protected visible = false
	private _stateDrawer = new Subject<boolean>()

	protected readonly THEME_MODE: typeof ThemeMode = ThemeMode
	protected readonly THEME_COLOR: typeof ThemeColor = ThemeColor

	protected readonly themeModes: IThemeMode[] = Array.from(THEME_MODES.values())
	protected readonly themeColors: IThemeColor[] = Array.from(THEME_COLORS.values())

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		if ((changes['currentThemeColor'].currentValue as IThemeColor).label === this.currentThemeColor.label) {
			document.body.className = (changes['currentThemeColor'].currentValue as IThemeColor).label
		}
	}

	public open(): void {
		this.visible = true
		this._stateDrawer.next(this.visible)
	}

	public close(): void {
		this.visible = false
		this._stateDrawer.next(this.visible)
	}

	/**
	 * @return {Observable<boolean>}
	 */
	public stateDrawer(): Observable<boolean> {
		return this._stateDrawer.asObservable()
	}

	protected onChooseThemeMode(option: IThemeMode) {
		console.log('onChooseThemeMode', option)
		LocalStorageService.setItem(AppResource.LOCAL_STORAGE_KEY.THEME_MODE, option)
		this.changeThemeMode.emit(option)
	}

	protected onChooseThemeColor(color: IThemeColor) {
		console.log('onChooseThemeMode', color)
		LocalStorageService.setItem(AppResource.LOCAL_STORAGE_KEY.THEME_COLOR, color)
		this.changeThemeColor.emit(color)
	}
}
