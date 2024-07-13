import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useGetFlashSaleQuery } from './hooks'
import { flashSaleConfig } from './configs'
import { FlashSaleModel } from './interfaces'

export default function FlashSaleComponent(): JSX.Element {
	const { data, isLoading } = useGetFlashSaleQuery()
	return (
		<>
			{!isLoading && (
				<div className='col l-12 mo-12 c-12'>
					<div className='pt-[20px]'>
						<div className='bg-[#fff]'>
							<div className='px-[20px] flex justify-between pb-[10px] pt-[20px]'>
								<div className='w-full h-full'>
									<div className='w-[114px] h-full '>
										<img src='/assets/Img/icon_flash_sale.png' className='w-full h-full' alt='' />
									</div>
								</div>
								<NavLink
									to='/flash-sale'
									className='w-[115px] capitalize text-[#ee4d2d] hover:text-[#ee4d2d]'>
									Xem tất cả&nbsp;
									<i className='fa-solid fa-angle-right'></i>
								</NavLink>
							</div>

							<div className='row gap-[10px]' id='flashSale'>
								<Slider {...flashSaleConfig.settings}>
									{data?.response?.map((item: FlashSaleModel, index: number) => (
										<NavLink to='/flash-sale' className='shadow-[unset]' key={index}>
											<LazyLoadImage
												effect='blur'
												src={item.image}
												alt='itemProduct'
												className='w-full cursor-pointer bg-[top_center] bg-contain bg-no-repeat rounded-br-[2px] rounded-bl-[2px]'
											/>
											<div>
												<div className='flex flex-col items-stretch h-[inherit] px-0 py-[0.9375rem]'>
													<div className='flex flex-col items-center mb-[0.3125rem]'>
														<div className='text-lg font-medium h-[1.6875rem] text-[#ee4d2d] flex justify-center items-center w-full'>
															<div className='flex items-baseline overflow-hidden text-ellipsis'>
																<span className='text-lg font-medium mr-0.5'>₫</span>
																{item.price}
															</div>
														</div>
													</div>
													<div className=' px-2.5 py-0 pl-[6px] pr-2.5 pt-[10px] pb-2.5'>
														<div className='relative w-full h-[16px]'>
															<div
																className='flex items-center justify-center absolute h-[inherit] w-[inherit] text-[#fff] text-[0.625rem] font-bold uppercase z-[3] left-0 top-0'
																style={{
																	textShadow: '0 0 8px rgb(0 0 0 / 12%)'
																}}>
																ĐANG BÁN CHẠY
															</div>
															<div
																className='bg-[#ef3313] z-9 w-[7%] h-[16px] absolute'
																style={{
																	borderRadius: '8px 0px 0px 8px',
																	color: 'red',
																	zIndex: 9
																}}></div>
															<div className=' absolute h-[inherit] left-0 top-0 rounded-[8px] w-[inherit] z-[1] bg-[#ffbda6]'></div>
														</div>
													</div>
												</div>
											</div>
										</NavLink>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
