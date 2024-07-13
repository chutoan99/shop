import { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetFlashSaleQuery } from '../../modules/home/flashSale/hooks'

function FlashSalePage(): JSX.Element {
	const { data } = useGetFlashSaleQuery()
	const navigate = useNavigate()

	return (
		<>
			<div className='mt-[120px] pt-[30px] z-[3] opacity-95 flex shadow-[0_1px_1px_rgb(0_0_0_/_5%)] px-0 py-[15px] top-0 bg-[#fff]'>
				<div className='justify-center items-center h-[30px] leading-[1.875rem] relative inline-flex mx-auto my-0'>
					<div className='w-full h-full '>
						<img src='/assets/Img/icon_flash_sale.png' className='w-full h-full' alt='' />
					</div>
					<div className='w-auto bg-[16px] whitespace-nowrap h-[30px] leading-[30px] uppercase mx-2.5 my-0 pl-5'>
						Kết thúc trong
					</div>
				</div>
			</div>

			<div className='bg-[#f5f5f5] overflow-hidden'>
				<div className='grid wide'>
					<div className='row sm-gutter'>
						<div className='w-full h-full'>
							<img
								src='https://cf.shopee.vn/file/sg-11134004-23010-jp5zi98p7umv51'
								alt=''
								className='w-[100%] h-[100%]'
							/>
						</div>
						<div style={{ margin: '0px' }}>
							<div>
								<ul
									className='flex relative h-full'
									style={{
										width: '100%',
										transform: 'translate(0px, 0px)'
									}}>
									<li
										className='overflow-x-hidden float-left touch-pan-y'
										style={{
											padding: '0px',
											width: '20%'
										}}>
										<div>
											<NavLink
												to='/'
												className='gap-[5px] no-underline text-[rgba(0,0,0,0.87)]  flex flex-col h-16 justify-center relative text-center  text-[#fff] bg-[#ee4d2d] hover:text-[rgba(0,0,0,0.87)]'>
												<div className='text-[1.5rem]'>21:00</div>
												<div className='capitalize'>Đang diễn ra</div>
											</NavLink>
										</div>
									</li>
									<li
										className='overflow-x-hidden float-left touch-pan-y'
										style={{
											padding: '0px',
											width: '20%'
										}}>
										<div>
											<NavLink
												to='/'
												className='gap-[5px] no-underline text-[rgba(0,0,0,0.87)] block text-[#c3c3c3] flex flex-col h-16 justify-center relative text-center bg-[#414142] hover:text-[rgba(0,0,0,0.87)]'>
												<div className='text-[1.5rem]'>00:00</div>
												<div className='capitalize'>Ngày mai</div>
											</NavLink>
										</div>
									</li>
									<li
										className='overflow-x-hidden float-left touch-pan-y'
										style={{
											padding: '0px',
											width: '20%'
										}}>
										<div>
											<NavLink
												to='/'
												className='gap-[5px] no-underline text-[rgba(0,0,0,0.87)] block text-[#c3c3c3] flex flex-col h-16 justify-center relative text-center bg-[#414142] hover:text-[rgba(0,0,0,0.87)]'>
												<div className='text-[1.5rem]'>02:00</div>
												<div className='capitalize'>Ngày mai</div>
											</NavLink>
										</div>
									</li>
									<li
										className='overflow-x-hidden float-left touch-pan-y'
										style={{
											padding: '0px',
											width: '20%'
										}}>
										<div>
											<NavLink
												to='/'
												className='gap-[5px] no-underline text-[rgba(0,0,0,0.87)] block text-[#c3c3c3] flex flex-col h-16 justify-center relative text-center bg-[#414142] hover:text-[rgba(0,0,0,0.87)]'>
												<div className='text-[1.5rem]'>09:00</div>
												<div className='capitalize'>Ngày mai</div>
											</NavLink>
										</div>
									</li>
									<li
										className='overflow-x-hidden float-left touch-pan-y'
										style={{
											padding: '0px',
											width: '20%'
										}}>
										<div>
											<NavLink
												to='/'
												className='gap-[5px] no-underline text-[rgba(0,0,0,0.87)] block text-[#c3c3c3] flex flex-col h-16 justify-center relative text-center bg-[#414142] hover:text-[rgba(0,0,0,0.87)]'>
												<div className='text-[1.5rem]'>12:00</div>
												<div className='capitalize'>Ngày mai</div>
											</NavLink>
										</div>
									</li>
								</ul>
							</div>
						</div>
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
						<div className='col l-12 mo-12 c-12 mt-[20px]'>
							<div className='mb-[10px]'>
								<div className='row sm- px-[15px] pb-[12px]'>
									{data?.response?.map((item: any, index: number) => (
										<div className='col l-2 mo-4 c-6' key={item.id}>
											<div
												className='bg-[#fff] relative shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-[linear] delay-[0.1s] no-underline block cursor-pointer mt-[5px] pb-[5px] rounded-sm'
												key={item.itemid}
												onClick={() => navigate(`/product/${item?.itemid}/${item?.shopid}`)}>
												{item?.show_free_shipping === 1 ? (
													<img
														src='/assets/Img/sale_sticker.png'
														className='absolute'
														style={{
															zIndex: '9'
														}}
														alt=' '
													/>
												) : null}
												<LazyLoadImage
													effect='blur'
													src={item.image}
													alt='itemProduct'
													className='blur-none transition-[filter] duration-[0.3s]'
												/>
												<h4
													className='text-sm font-normal text-[#333] leading-[1.125rem] h-9 overflow-hidden ml-1.5 mr-2.5 my-2.5'
													style={{
														display: '-webkit-box',
														WebkitBoxOrient: 'vertical',
														WebkitLineClamp: 2
													}}>
													{item?.name}
												</h4>
												<div
													style={{
														padding: '10px'
													}}>
													<div
														className='relative w-full'
														style={{
															height: '16px'
														}}>
														<div
															className='flex items-center justify-center absolute h-[inherit] w-[inherit] text-[#fff] text-[0.625rem] font-bold uppercase z-[3] left-0 top-0'
															style={{
																textShadow: '0 0 8px rgb(0 0 0 / 12%)'
															}}>
															ĐANG BÁN CHẠY
														</div>
														<div
															className='bg-[#ef3313] z-9  w-[7%] h-[16px] absolute'
															style={{
																borderRadius: '8px 0px 0px 8px',
																color: 'red',
																zIndex: 9
															}}></div>
														<div
															className='absolute h-[inherit] w-[inherit] z-[1] left-0 top-0 bg-[#ffbda6]'
															style={{
																borderRadius: '8px'
															}}></div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default memo(FlashSalePage)
