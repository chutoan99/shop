export interface INavigation {
	path: string
	icon: string
	label: string
	children: INavigation[]
}

export const NAVIGATION: INavigation[] = [
	{
		path: '/',
		icon: '/assets/svg/menu/home.svg',
		label: 'Dashboard',
		children: []
	},
	{
		path: '/chat',
		icon: '/assets/svg/menu/chat.svg',
		label: 'Chat',
		children: []
	},
	{
		path: '/products',
		icon: '/assets/svg/menu/product.svg',
		label: 'Products',
		children: []
	},
	{
		path: '/ships',
		icon: '/assets/svg/menu/ship.svg',
		label: 'Ships',
		children: []
	},
	{
		path: '/orders',
		icon: '/assets/svg/menu/order.svg',
		label: 'Orders',
		children: []
	},
	{
		path: '/reports',
		icon: '/assets/svg/menu/report.svg',
		label: 'Report',
		children: []
	},
	{
		path: '/system-management',
		icon: '/assets/svg/menu/setting.svg',
		label: 'System Management',
		children: []
	},
	{
		path: '/settings',
		icon: '/assets/svg/menu/setting.svg',
		label: 'Settings',
		children: []
	},
	{
		path: '/store-config',
		icon: '/assets/svg/menu/store.svg',
		label: 'Store',
		children: []
	}
]
