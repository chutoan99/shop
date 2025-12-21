import { AuthLayout } from '@layouts/auth'
import { CartLayout } from '@layouts/cart'
import { DefaultLayout } from '@layouts/default'
import { OrderLayout } from '@layouts/order'
import { SearchLayout } from '@layouts/search'
import { UserLayout } from '@layouts/user'
import { lazy } from 'react'

export type RouteConFig = {
	path: string
	component: any
	layout?: any
}

const routes: RouteConFig[] = [
	{
		path: '/',
		component: lazy(() => import('@modules/home/home.page')),
		layout: DefaultLayout
	},
	{
		path: '/daily-discover',
		component: lazy(() => import('@modules/post/daily.page')),
		layout: DefaultLayout
	},
	{
		path: '/flash-sale',
		component: lazy(() => import('@modules/flash-sale/flash-sale.page')),
		layout: DefaultLayout
	},
	{
		path: '/mall',
		component: lazy(() => import('@modules/shope-mall/shop-mall.page')),
		layout: DefaultLayout
	},
	{
		path: '/top-products',
		component: lazy(() => import('@modules/top-product/top-product.page')),
		layout: DefaultLayout
	},
	{
		path: '/order',
		component: lazy(() => import('@modules/order/oder.page')),
		layout: OrderLayout
	},
	{
		path: '/shop/:shop_id',
		component: lazy(() => import('@modules/shop/shop.page')),
		layout: DefaultLayout
	},
	{
		path: '/cart',
		component: lazy(() => import('@modules/cart/cart.page')),
		layout: CartLayout
	},
	{
		path: '/auth/login',
		component: lazy(() => import('@modules/auth/modules/login/login.page')),
		layout: AuthLayout
	},
	{
		path: '/auth/register',
		component: lazy(() => import('@modules/auth/modules/register/register.page')),
		layout: AuthLayout
	},
	{
		path: '/auth/forgot-password',
		component: lazy(() => import('@modules/auth/modules/forgotPassword/forgot-password.page')),
		layout: AuthLayout
	},
	{
		path: '/auth/reset-password/:email/:token',
		component: lazy(() => import('@modules/auth/modules/resetPassword/reset-password.page')),
		layout: AuthLayout
	},
	{
		path: '/search/:search',
		component: lazy(() => import('@modules/search/search.page')),
		layout: SearchLayout
	},
	{
		path: '/categories/:display_name/:cat_id',
		component: lazy(() => import('@modules/category/category.page')),
		layout: SearchLayout
	},
	{
		path: 'user/purchase/',
		component: lazy(() => import('@modules/user-system/modules/purchase/purchase.page')),
		layout: UserLayout
	},
	{
		path: 'user/purchase/order/:order_id',
		component: lazy(() => import('@modules/order/order-detail.page')),
		layout: UserLayout
	},
	{
		path: 'user/profile',
		component: lazy(() => import('@modules/user-system/modules/account/account.page')),
		layout: UserLayout
	},
	{
		path: 'user/notify',
		component: lazy(() => import('@modules/user-system/modules/notify/notify.page')),
		layout: UserLayout
	},
	{
		path: 'user/voucher',
		component: lazy(() => import('@modules/user-system/modules/notify/notify.page')),
		layout: UserLayout
	},
	{
		path: '/*',
		component: lazy(() => import('@modules/page-not-found/page-not-found.page')),
		layout: DefaultLayout
	},
	{
		path: '/product/:item_id/:shop_id',
		component: lazy(() => import('@modules/post/product-detail.page')),
		layout: DefaultLayout
	}
]

export default routes
