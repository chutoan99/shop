import { useParams } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import ProductBreadcrumbComponent from './components/product-breadcrumb.component'
import { LoadingCustomComponent } from '../shared'
import ProductDetailComponent from './components/product-detail.component'
import ProductShopComponent from './components/product-shop.component'
import ProductOverviewComponent from './components/product-overview.component'
import { ProductCommentComponent } from './components'
import { IShopModel } from '@models/shop.model'
import { IProductDetailModel } from '@models/post-detail.model'
import { useGetProductQuery } from '@hooks/apis/post.hook'

function DetailProductPage(): JSX.Element {
	const params = useParams()
	const { data, isLoading } = useGetProductQuery(Number(params.item_id))
	const [dataShop, setDataShop] = useState<IShopModel>()
	const [dataPostDetail, setDataPostDetail] = useState<IProductDetailModel>()

	useEffect(() => {
		data && setDataPostDetail(data)
		data?.shop_info && setDataShop(data.shop_info)
	}, [data])

	return (
		<>
			{isLoading && <LoadingCustomComponent />}
			<div className='mt-[120px]'></div>
			<div className='bg-[#f5f5f5] overflow-hidden py-[20px]'>
				{dataPostDetail && (
					<>
						<ProductBreadcrumbComponent data={dataPostDetail} />
						<ProductDetailComponent data={dataPostDetail} />
					</>
				)}
			</div>
			{dataShop && <ProductShopComponent data={dataShop} />}

			{dataPostDetail && <ProductOverviewComponent data={dataPostDetail} />}

			<ProductCommentComponent />
		</>
	)
}
export default memo(DetailProductPage)
