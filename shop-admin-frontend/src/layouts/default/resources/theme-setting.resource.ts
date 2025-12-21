export enum ThemeColor {
	BlueTheme = 'blue_theme',
	AquaTheme = 'aqua_theme',
	PurpleTheme = 'purple_theme',
	GreenTheme = 'green_theme',
	CyanTheme = 'cyan_theme',
	OrangeTheme = 'orange_theme',
	RedTheme = 'red_theme',
	PinkTheme = 'pink_theme',
	YellowTheme = 'yellow_theme',
	TealTheme = 'teal_theme',
	IndigoTheme = 'indigo_theme',
	GrayTheme = 'gray_theme'
}

export enum ThemeMode {
	LightTheme = 'light_theme',
	DarkTheme = 'dark_theme'
}

export interface IThemeColor {
	label: ThemeColor
	primary: string
	primaryFixedDim: string
}

export interface IThemeMode {
	label: ThemeMode
	value: string
}

export const THEME_COLORS: ReadonlyMap<ThemeColor, IThemeColor> = new Map([
	[
		ThemeColor.BlueTheme,
		{
			label: ThemeColor.BlueTheme,
			primary: 'rgb(0, 133, 219)',
			primaryFixedDim: 'rgba(0, 133, 219, 0.15)'
		}
	],
	[
		ThemeColor.AquaTheme,
		{
			label: ThemeColor.AquaTheme,
			primary: '#0074ba',
			primaryFixedDim: 'rgba(0, 116, 186, 0.15)'
		}
	],
	[
		ThemeColor.PurpleTheme,
		{
			label: ThemeColor.PurpleTheme,
			primary: '#5F2FB4',
			primaryFixedDim: 'rgba(95, 47, 180, 0.15)'
		}
	],
	[
		ThemeColor.GreenTheme,
		{
			label: ThemeColor.GreenTheme,
			primary: '#0a7ea4',
			primaryFixedDim: 'rgba(10, 126, 164, 0.15)'
		}
	],
	[
		ThemeColor.CyanTheme,
		{
			label: ThemeColor.CyanTheme,
			primary: '#01c0c8',
			primaryFixedDim: 'rgba(1, 192, 200, 0.15)'
		}
	],
	[
		ThemeColor.OrangeTheme,
		{
			label: ThemeColor.OrangeTheme,
			primary: '#fb5533',
			primaryFixedDim: 'rgb(251, 85, 51, 0.15)'
		}
	],
	[
		ThemeColor.RedTheme,
		{
			label: ThemeColor.RedTheme,
			primary: '#e74c3c',
			primaryFixedDim: 'rgba(231, 76, 60, 0.15)'
		}
	],
	[
		ThemeColor.PinkTheme,
		{
			label: ThemeColor.PinkTheme,
			primary: '#e91e63',
			primaryFixedDim: 'rgba(233, 30, 99, 0.15)'
		}
	],
	[
		ThemeColor.YellowTheme,
		{
			label: ThemeColor.YellowTheme,
			primary: '#f1c40f',
			primaryFixedDim: 'rgba(241, 196, 15, 0.15)'
		}
	],
	[
		ThemeColor.TealTheme,
		{
			label: ThemeColor.TealTheme,
			primary: '#009688',
			primaryFixedDim: 'rgba(0, 150, 136, 0.15)'
		}
	],
	[
		ThemeColor.IndigoTheme,
		{
			label: ThemeColor.IndigoTheme,
			primary: '#3f51b5',
			primaryFixedDim: 'rgba(63, 81, 181, 0.15)'
		}
	],
	[
		ThemeColor.GrayTheme,
		{
			label: ThemeColor.GrayTheme,
			primary: '#95a5a6',
			primaryFixedDim: 'rgba(149, 165, 166, 0.15)'
		}
	]
])

export const THEME_MODES: ReadonlyMap<ThemeMode, IThemeMode> = new Map([
	[
		ThemeMode.LightTheme,
		{
			label: ThemeMode.LightTheme,
			value: 'light'
		}
	],
	[
		ThemeMode.DarkTheme,
		{
			label: ThemeMode.DarkTheme,
			value: 'dark'
		}
	]
])
