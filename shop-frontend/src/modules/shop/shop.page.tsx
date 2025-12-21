import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopInfoComponent } from './components'
import { LoadingCustomComponent } from '@modules/shared'
import ProductListComponent from '@modules/post/components/product-list.component'
import { IShopModel } from '@models/shop.model'
import { useGetItemsShopQuery, useGetShopIdQuery } from '@hooks/apis/shop.hook'

function ShopPage(): JSX.Element {
	const params = useParams()
	const dataShop = useGetShopIdQuery(Number(params.shop_id))
	const dataItemsShop = useGetItemsShopQuery(Number(params.shop_id))

	return (
		<>
			{dataItemsShop.isLoading && <LoadingCustomComponent />}
			{dataShop.isSuccess && <ShopInfoComponent data={dataShop.currentData as IShopModel} />}
			{dataItemsShop.isSuccess && (
				<div className='bg-[#f5f5f5] overflow-hidden pb-[50px]'>
					<div className='grid wide'>
						<div className='row sm-gutter pt-[16px]'>
							<ProductListComponent
								col={'col l-2-4 mo-4 c-6'}
								items={dataItemsShop?.currentData || []}
								loading={dataItemsShop?.isLoading}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default memo(ShopPage)
