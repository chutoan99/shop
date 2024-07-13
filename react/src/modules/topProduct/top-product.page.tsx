import { NavLink } from 'react-router-dom'
import { memo, useState } from 'react'
import { CONSTANT } from '../post/resources'
import { useSearchProductQuery } from '../post/hooks'
import ProductListComponent from '../post/components/product-list.component'
import { LoadingDefaultComponent, PaginationComponent } from '../shared'

function TopProductPage(): JSX.Element {
	const [payload, setPayload] = useState({
		limit: CONSTANT.LIMIT,
		page: CONSTANT.PAGE
	})
	const { data, isLoading } = useSearchProductQuery(payload)

	return (
		<div className='bg-[#f5f5f5] overflow-hidden mt-[120px]'>
			<div className='grid wide'>
				<div className='row sm-gutter'>
					<div className='col l-12 mo-12 c-12'>
						<h1 className='text-[#555] text-[1.75rem] font-medium text-center mx-0 my-[2.5625rem]'>
							Tìm kiếm hàng đầu
						</h1>
						<div className='m-h-[50px] mt-[20px]'>
							<div
								className='h-[68px] leading-[68px] flex shadow-[0_1px_1px_0_rgb(0_0_0_/_5%)]'
								style={{
									backgroundColor: 'rgb(255, 255, 255)'
								}}>
								<div className='flex justify-around w-full'>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>Top Picks</span>
									</NavLink>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>HÀNG HIỆU GIÁ TỐT</span>
									</NavLink>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>SHOP NỔI BẬT</span>
									</NavLink>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>SHOP YÊU THÍCH</span>
									</NavLink>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>E-VOUCHER VÀ NẠP THẺ</span>
									</NavLink>
									<NavLink to='/' className='hover:text-[#ee4d2d]'>
										<span>BẮT TREND GIÁ SỐC</span>
									</NavLink>
									<div>
										<div>Thêm</div>
									</div>
								</div>
							</div>
						</div>
						<ProductListComponent
							items={data?.response || []}
							col={'col l-2-4 mo-4 c-6'}
							loading={isLoading}
						/>
						{isLoading ? (
							<LoadingDefaultComponent />
						) : (
							<PaginationComponent setPayload={setPayload} totalPage={data?.totalPage || 0} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(TopProductPage)
