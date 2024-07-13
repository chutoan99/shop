import { useParams } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import ProductBreadcrumbComponent from './components/product-breadcrumb.component'
import { LoadingCustomComponent } from '../shared'
import ProductDetailComponent from './components/product-detail.component'
import ProductShopComponent from './components/product-shop.component'
import ProductOverviewComponent from './components/product-overview.component'
import { useGetProductQuery } from './hooks'

function DetailProductPage(): JSX.Element {
	const params = useParams()
	const { data, isLoading } = useGetProductQuery(Number(params.itemid))
	const [dataShop, setDataShop] = useState<IShop>()
	const [dataPostDetail, setDataPostDetail] = useState<IProductDetail>()

	useEffect(() => {
		data?.response && setDataPostDetail(data?.response)
		data?.response?.shop_info && setDataShop(data.response.shop_info)
	}, [data])
	return (
		<>
			{isLoading ? (
				<LoadingCustomComponent />
			) : (
				<>
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

					{/* <ProductCommentComponent /> */}
				</>
			)}
		</>
	)
}
export default memo(DetailProductPage)
