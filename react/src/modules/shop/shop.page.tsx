import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useGetItemsShopQuery, useGetShopIdQuery } from './hooks'
import { LoadingCustomComponent } from '../shared/loading'
import { ShopInfoComponent } from './components'
import ProductListComponent from '../post/components/product-list.component'
import { ShopModel } from './interfaces'

function ShopPage(): JSX.Element {
	const params = useParams()
	const { data: dataInfoShop } = useGetShopIdQuery(Number(params.shopid))
	const { data: dataItemsShop, isLoading } = useGetItemsShopQuery(Number(params.shopid))

	return (
		<>
			{isLoading ? (
				<LoadingCustomComponent />
			) : (
				<>
					<ShopInfoComponent data={dataInfoShop?.response as ShopModel} />
					<div className='bg-[#f5f5f5] overflow-hidden pb-[50px]'>
						<div className='grid wide'>
							<div className='row sm-gutter pt-[16px]'>
								<ProductListComponent
									col={'col l-2-4 mo-4 c-6'}
									items={dataItemsShop?.response || []}
									loading={isLoading}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}
export default memo(ShopPage)
