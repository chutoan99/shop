import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useGetShopMallQuery } from './hooks'
import { shopMallData } from './resources/shop-mall.resource'
import { shopMallConfig } from './configs'
import { ShopMallModel } from './interfaces'

export default function ShopMallComponent(): JSX.Element {
	const { data, isLoading } = useGetShopMallQuery()
	return (
		<div className='col l-12 mo-12 c-12'>
			{!isLoading && (
				<div className='pt-[20px]'>
					<div className='bg-[#fff]'>
						<div className='px-[20px] flex justify-between pb-[10px] pt-[20px] border-b-[rgba(0,0,0,0.05)] border-b border-solid'>
							<div className='block no-underline text-[#726466] uppercase font-medium text-[1.0625rem] leading-[1.0625rem] self-center'>
								SHOPEE MALL
							</div>
							<div className='flex-1 font-normal capitalize flex ml-[15px] pl-[15px] border-l-[#d8d8d8] border-l border-solid'>
								<div className='flex items-center text-[#333] whitespace-nowrap h-5 mr-[15px]'>
									<img
										className='h-[1.0625rem] w-[1.0625rem] block align-middle max-w-full mr-1.5 border-none'
										src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/6c502a2641457578b0d5f5153b53dd5d.png'
										alt='Shop logo'
									/>
									7 ngày miễn phí trả hàng
								</div>
								<div className='flex items-center text-[#333] whitespace-nowrap h-5 mr-[15px]'>
									<img
										className='h-[1.0625rem] w-[1.0625rem] block align-middle max-w-full mr-1.5 border-none'
										src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/511aca04cc3ba9234ab0e4fcf20768a2.png'
										alt='Shop logo'
									/>
									Hàng chính hãng 100%
								</div>
								<div className='flex items-center text-[#333] whitespace-nowrap h-5 mr-[15px]'>
									<img
										className='h-[1.0625rem] w-[1.0625rem] block align-middle max-w-full mr-1.5 border-none'
										src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/16ead7e0a68c3cff9f32910e4be08122.png'
										alt='Shop logo'
									/>
									Miễn phí vận chuyển
								</div>
							</div>
							<NavLink to='/mall' className='w-[115px] capitalize text-[#ee4d2d] hover:text-[#ee4d2d]'>
								Xem tất cả&nbsp;
								<i className='fa-solid fa-angle-right'></i>
							</NavLink>
						</div>
						<div className='mb-[10px] flex'>
							<div className='l-4 mo-8 c-8' id='shopmall'>
								<Slider {...shopMallConfig.settingsBanner}>
									{shopMallData?.map((listItem: any, index: number) => {
										return (
											<img
												src={listItem?.src}
												alt='Slider'
												className='w-full h-full'
												key={index}
											/>
										)
									})}
								</Slider>
							</div>
							<div className='l-8'>
								<div className='l-12'>
									<Slider {...shopMallConfig.settingsSlider}>
										{data?.response?.map((ele: any, index: number) => (
											<div key={index} className='col col-3'>
												{ele?.map((item: ShopMallModel, index: number) => (
													<div className='w-full px-[10px]' key={index}>
														<div
															className='relative'
															style={{
																boxShadow: 'unset'
															}}>
															<LazyLoadImage
																effect='blur'
																src={item.image}
																alt='itemProduct'
																className='w-full cursor-pointer bg-[top_center] bg-contain bg-no-repeat rounded-br-[2px] rounded-bl-[2px]'
															/>
														</div>
														<div className='absolute z-[1] w-8 h-10 bg-[2rem_2.5rem] bg-no-repeat left-0 top-0'></div>
														<div>
															<div
																className=' w-[172px] h-[27px] leading-[27px] text-center text-lg text-ellipsis overflow-hidden text-[#d0011b] left-3.5 bottom-[18px]'
																style={{
																	display: '-webkit-box',
																	WebkitBoxOrient: 'vertical',
																	WebkitLineClamp: 1,
																	wordWrap: 'break-word'
																}}>
																{item.promo_text}
															</div>
														</div>
													</div>
												))}
											</div>
										))}
									</Slider>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
