import { Fragment, Suspense, useEffect } from 'react'
import routes, { RouteConFig } from './path'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from '@hooks/hooks'
import { AppDispatch } from '@redux/app'
import { CartActions } from '@redux/cart.slice'
import { useGetCartsQuery } from '@hooks/apis/cart.hook'

const App = () => {
	const dispatch: AppDispatch = useAppDispatch()
	const { data, isLoading } = useGetCartsQuery()

	useEffect(() => {
		if (!isLoading) {
			dispatch(CartActions.updateTotalCart(data?.total || 0))
		}
	}, [isLoading])
	return (
		<Routes>
			{routes?.map((route: RouteConFig, index: number) => {
				const Layout = route.layout === null ? Fragment : route.layout
				const Page = route.component
				return (
					<Route
						key={index}
						path={route.path}
						element={
							<Layout>
								<Suspense fallback={<div>Loading ...</div>}>
									<Page />
								</Suspense>
							</Layout>
						}
					/>
				)
			})}
		</Routes>
	)
}

export default App
