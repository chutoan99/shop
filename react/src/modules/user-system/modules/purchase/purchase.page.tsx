import { Link, NavLink } from 'react-router-dom'
import { memo, useState } from 'react'
import { LoadingDefaultComponent } from '../../../shared/loading'
import { OrderModel, QueryOrderDto, TabsModel } from '../../../order/interfaces'
import { useSearchOrdersQuery } from '../../../order/hooks'
import { formatPrice } from '../../../../utils/formatPrice'
import { stateOrder } from '../../../order/resources'
import { LIST_TAB } from './resources'

function PurchasePage(): JSX.Element {
	const [orderParams, setOrderParams] = useState<QueryOrderDto>({
		type: stateOrder.is_all,
		shop_name: ''
	})
	const { data, refetch, isLoading } = useSearchOrdersQuery(orderParams)

	const onKeyDown = (e: any) => {
		if (e.code === 'Enter' && orderParams.shop_name !== '') {
			refetch()
		}
	}

	return (
		<>
			{isLoading ? (
				<LoadingDefaultComponent />
			) : (
				<div className='col-lg-10'>
					<div className='w-full mb-[12px] flex overflow-hidden bg-[#fff]'>
						{LIST_TAB(data?.tab as TabsModel)?.map((tab: any, index: number) => (
							<span
								key={index}
								onClick={() => {
									setOrderParams((prev: QueryOrderDto) => {
										return {
											...prev,
											type: index
										}
									})
								}}
								className={`bg-[#fff] cursor-pointer select-none text-base leading-[1.188rem] text-center text-[rgba(0,0,0,0.8)] flex flex-1 overflow-hidden items-center justify-center transition-[color] duration-[0.2s] px-0 py-3 hover:text-[#ee4d2d] ${
									orderParams.type === index &&
									'text-[#ee4d2d] border-[#ee4d2d]  border-b-2  border-solid'
								}`}
								style={{
									WebkitUserSelect: 'none',
									MozUserSelect: 'none'
								}}>
								<span>
									{tab.content}
									<>
										{tab.total !== 0 && (
											<span className='text-sm text-[#ee4d2d] ml-1 mr-0 my-0'>({tab.total})</span>
										)}
									</>
								</span>
							</span>
						))}
					</div>

					{orderParams.type === stateOrder.is_all && (
						<div className='bg-[#eaeaea] flex items-center shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] text-[#212121] mx-0 my-3 px-0 py-[10px] rounded-sm h-[45px]'>
							<svg
								width='19px'
								height='19px'
								viewBox='0 0 19 19'
								className='p-0 stroke-[#bbb] mx-[15px] my-0'>
								<g id='Search-New' strokeWidth={1} fill='none' fillRule='evenodd'>
									<g
										id='my-purchase-copy-27'
										transform='translate(-399.000000, -221.000000)'
										strokeWidth={2}>
										<g id='Group-32' transform='translate(400.000000, 222.000000)'>
											<circle id='Oval-27' cx={7} cy={7} r={7} />
											<path
												d='M12,12 L16.9799555,16.919354'
												id='Path-184'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</g>
									</g>
								</g>
							</svg>
							<input
								value={orderParams.shop_name}
								onChange={(e) => {
									setOrderParams((prev: QueryOrderDto) => {
										return {
											...prev,
											shop_name: e.target.value
										}
									})
								}}
								autoComplete='off'
								type='text'
								placeholder='Bạn có thể tìm kiếm theo tên Shop để tìm kiếm sản phẩm'
								defaultValue=''
								className='flex-1 text-sm leading-4 bg-inherit border-0 outline-none'
								onKeyDown={onKeyDown}
							/>
						</div>
					)}

					{data?.response?.length === 0 && (
						<>
							<div className='w-full h-[600px] text-center'>
								<div
									className='flex rounded-[0.125rem] overflow-hidden flex-col justify-center w-full h-full bg-[#fff] items-center'
									style={{
										boxShadow: '0 1px 1px 0 rgb(0 0 0 / 5%)'
									}}>
									<div className='A849D8'>
										<img
											src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
											alt='emptyOrder'
										/>
									</div>
									<div
										className='text-[1.125rem] leading-[1.4rem] mt-[20px]'
										style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
										Chưa có đơn hàng
									</div>
								</div>
							</div>
						</>
					)}

					{data?.response?.map((cart: OrderModel) => (
						<div className='shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] mx-0 my-3 rounded-sm' key={cart.id}>
							<div className='px-6 py-3 bg-[#fff]'>
								<div className='flex items-center justify-between pt-0 pb-3 px-0'>
									<div className='flex items-center whitespace-nowrap'>
										<div className='flex items-center'>
											<svg
												className='mr-[5px]'
												xmlns='http://www.w3.org/2000/svg'
												width={70}
												height={16}
												fill='none'>
												<path
													fill='#EE4D2D'
													fillRule='evenodd'
													d='M0 2C0 .9.9 0 2 0h66a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2z'
													clipRule='evenodd'
												/>
												<g clipPath='url(#clip0)'>
													<path
														fill='#fff'
														d='M8.7 13H7V8.7L5.6 6.3A828.9 828.9 0 004 4h2l2 3.3a1197.3 1197.3 0 002-3.3h1.6L8.7 8.7V13zm7.9-1.7h1.7c0 .3-.2.6-.5 1-.2.3-.5.5-1 .7l-.6.2h-.8c-.5 0-1 0-1.5-.2l-1-.8a4 4 0 01-.9-2.4c0-1 .3-1.9 1-2.6a3 3 0 012.4-1l.8.1a2.8 2.8 0 011.3.7l.4.6.3.8V10h-4.6l.2 1 .4.7.6.5.7.1c.4 0 .7 0 .9-.2l.2-.6v-.1zm0-2.3l-.1-1-.3-.3c0-.2-.1-.2-.2-.3l-.8-.2c-.3 0-.6.2-.9.5l-.3.5a4 4 0 00-.3.8h3zm-1.4-4.2l-.7.7h-1.4l1.5-2h1.1l1.5 2h-1.4l-.6-.7zm8.1 1.6H25V13h-1.7v-.5.1H23l-.7.5-.9.1-1-.1-.7-.4c-.3-.2-.4-.5-.6-.8l-.2-1.3V6.4h1.7v3.7c0 1 0 1.6.3 1.7.2.2.5.3.7.3h.4l.4-.2.3-.3.3-.5.2-1.4V6.4zM34.7 13a11.2 11.2 0 01-1.5.2 3.4 3.4 0 01-1.3-.2 2 2 0 01-.5-.3l-.3-.5-.2-.6V7.4h-1.2v-1h1.1V5h1.7v1.5h1.9v1h-2v3l.2 1.2.1.3.2.2h.3l.2.1c.2 0 .6 0 1.3-.3v1zm2.4 0h-1.7V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.4.4.2.7V13h-1.6V9.3 8.1l-.4-.6-.6-.2a1 1 0 00-.4.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.1.5-.1.9V13zm5.4-6.6H44V13h-1.6V6.4zm-.8-.9l1.8-2h1.8l-2.1 2h-1.5zm7.7 5.8H51v.5l-.4.5a2 2 0 01-.4.4l-.6.3-1.4.2c-.5 0-1 0-1.4-.2l-1-.7c-.3-.3-.5-.7-.6-1.2-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4a2.6 2.6 0 011.6-1.8c.4-.2.9-.3 1.4-.3.6 0 1 .1 1.5.3.4.1.7.4 1 .6l.2.5.1.5h-1.6c0-.3-.1-.5-.3-.6-.2-.2-.4-.3-.8-.3s-.8.2-1.2.6c-.3.4-.4 1-.4 2 0 .9.1 1.5.4 1.8.4.4.8.6 1.2.6h.5l.3-.2.2-.3v-.4zm4 1.7h-1.6V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.3.4.3.7V13h-1.6V9.3L56 8.1c-.1-.3-.2-.5-.4-.6l-.6-.2a1 1 0 00-.3.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.2.5V13z'
													/>
												</g>
												<g clipPath='url(#clip1)'>
													<path
														fill='#fff'
														d='M63 8.2h2.2v1.6H63V12h-1.6V9.8h-2.2V8.2h2.2V6H63v2.3z'
													/>
												</g>
												<defs>
													<clipPath id='clip0'>
														<path fill='#fff' d='M0 0h55v16H0z' transform='translate(4)' />
													</clipPath>
													<clipPath id='clip1'>
														<path fill='#fff' d='M0 0h7v16H0z' transform='translate(59)' />
													</clipPath>
												</defs>
											</svg>
										</div>
										<div className='max-w-[200px] text-sm font-semibold overflow-hidden text-ellipsis ml-2 mr-0 my-0'>
											{cart?.shop_name}
										</div>
										<div className='ml-2 mr-0 my-0'>
											<button className='text-xs capitalize border bg-[#ee4d2d] text-[#fff] px-2 py-1 rounded-sm border-solid border-transparent  flex items-center hover:bg-[#d73211] hover:border-[#ba2b0f]'>
												<svg
													viewBox='0 0 17 17'
													className='mr-[5px] inline-block w-[1em] h-[1em] fill-current relative'
													style={{
														fill: 'white'
													}}>
													<g fillRule='evenodd'>
														<path
															d='M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z'
															fillRule='nonzero'
														/>
													</g>
												</svg>
												<span className='align-middle ml-1 mr-0 my-0'>chat</span>
											</button>
										</div>
										<NavLink className='ml-2 mr-0 my-0' to={`/shop/${cart.shopid}`}>
											<button className='text-xs flex items-center capitalize text-[#555] border px-2 py-1 rounded-sm border-solid border-[rgba(0,0,0,0.09)] hover:bg-[rgba(0,0,0,0.02)] hover:border hover:border-solid hover:border-[rgba(0,0,0,0.09)]'>
												<svg
													enableBackground='new 0 0 15 15'
													viewBox='0 0 15 15'
													x={0}
													y={0}
													className='mr-[5px] inline-block w-[1em] h-[1em] fill-current relative'>
													<path d='m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z' />
												</svg>
												<span className='align-middle ml-1 mr-0 my-0'>Xem Shop</span>
											</button>
										</NavLink>
									</div>
									<div className='flex items-center pl-2.5 pr-0 py-0'>
										<div className='flex items-center text-right ml-0 mr-2.5 my-0 pl-0 pr-[5px] py-0 border-r-[rgba(0,0,0,0.12)] border-r border-solid'>
											<NavLink
												className='inline-flex items-center align-middle'
												to='/user/purchase/order/143045877205897?type=6'>
												<span className='no-underline text-[#26aa99] align-middle'>
													<svg
														enableBackground='new 0 0 15 15'
														viewBox='0 0 15 15'
														x={0}
														y={0}
														className='align-middle text-base text-[#00bfa5] stroke-[#26aa99] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 mt-0 mb-px'>
														<g>
															<line
																fill='none'
																strokeLinejoin='round'
																strokeMiterlimit={10}
																x1='8.6'
																x2='4.2'
																y1='9.8'
																y2='9.8'
															/>
															<circle
																cx={3}
																cy='11.2'
																fill='none'
																r={2}
																strokeMiterlimit={10}
															/>
															<circle
																cx={10}
																cy='11.2'
																fill='none'
																r={2}
																strokeMiterlimit={10}
															/>
															<line
																fill='none'
																strokeMiterlimit={10}
																x1='10.5'
																x2='14.4'
																y1='7.3'
																y2='7.3'
															/>
															<polyline
																fill='none'
																points='1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1'
																strokeLinejoin='round'
																strokeMiterlimit={10}
															/>
															<polyline
																fill='none'
																points='9.9 3.8 14 3.8 14.5 10.2 11.9 10.2'
																strokeLinejoin='round'
																strokeMiterlimit={10}
															/>
														</g>
													</svg>
													{/* Đơn hàng đã được giao thành công */}
												</span>
											</NavLink>
											<div
												className='flex relative overflow-visible ml-1.5 mr-0 my-0'
												id='pc-drawer-id-7'
												tabIndex={0}>
												<svg
													enableBackground='new 0 0 15 15'
													viewBox='0 0 15 15'
													x={0}
													y={0}
													className=' stroke-current inline-block w-[1em] h-[1em] fill-current relative'>
													<g>
														<circle
															cx='7.5'
															cy='7.5'
															fill='none'
															r='6.5'
															strokeMiterlimit={10}
														/>
														<path
															d='m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z'
															stroke='none'
														/>
													</g>
												</svg>
											</div>
										</div>
										<div className='leading-6 text-[#ee4d2d] text-right uppercase whitespace-nowrap'>
											{cart.state}
										</div>
									</div>
								</div>
								<hr className='border-b-[rgba(0,0,0,0.06)] border-b border-solid' />

								{cart.posts.map((post: any, i: number) => (
									<Link to='#' key={post.itemid} className='mb-[10px]'>
										<div className=''>
											<div>
												<span className='items-center flex-nowrap text-[rgba(0,0,0,0.87)] flex pt-3 pb-0 px-0'>
													<div />
													<div className='flex-1 items-start flex-nowrap flex pl-0 pr-3 py-0'>
														<div className=' w-[81px] h-[81px]'>
															<NavLink
																to={`/user/purchase/order/${cart.id}`}
																className='relative'>
																<div className='w-20 h-20 mr-3'>
																	<img
																		className='w-full h-full'
																		src={post?.image}
																		alt={post?.name}
																	/>
																</div>
																<div
																	className='bg-[50%] bg-cover bg-no-repeat absolute w-full h-full left-0 top-0'
																	style={{
																		backgroundImage: `${post?.image}`
																	}}>
																	<div className='w-full h-full'></div>
																</div>
															</NavLink>
														</div>

														<div className='min-w-0 flex flex-1 flex-col items-start pl-3 pr-0 py-0'>
															<NavLink to={`/user/purchase/order/${cart.id}`}>
																<div
																	className='overflow-hidden text-ellipsis text-base leading-22 max-h-12 mt-0 mb-[5px] mx-0'
																	style={{
																		display: '-webkit-box',
																		WebkitBoxOrient: 'vertical',
																		WebkitLineClamp: 2
																	}}>
																	<span>{post?.name}</span>
																</div>
															</NavLink>

															<div className='mt-0 mx-0'>
																<div className='text-[rgba(0,0,0,0.54)] mb-[5px]'>
																	Phân loại hàng: {cart?.tierVariation?.split(',')[i]}
																	, {cart?.item_option?.split(',')[i]}
																</div>
																<div className=''>x{cart?.amount?.split(',')[i]}</div>
															</div>
														</div>
													</div>
													<div>
														<div>
															<span className='align-middle text-sm leading-4 text-[rgba(0,0,0,0.87)]'>
																<div
																	className='text-sm flex justify-center flex-col text-center text-[#ee4d2d] font-medium'
																	style={{
																		flexDirection: 'row',
																		gap: '8px'
																	}}>
																	<h3 className='line-through text-[#ccc]'>
																		đ
																		{formatPrice(
																			post?.price_before_discount,
																			post?.amount
																		)}
																	</h3>
																	<h3>đ {formatPrice(post?.price, post?.amount)}</h3>
																</div>
															</span>
														</div>
													</div>
												</span>
											</div>
											<div className='h-2.5 border-b-[rgba(0,0,0,0.09)] border-b border-solid' />
										</div>
									</Link>
								))}
							</div>
							<div></div>
							<div className='w-full h-0 relative border-b-[rgba(0,0,0,0.09)] border-b border-dotted'></div>
							<div className='pt-6 pb-3 px-6 bg-[#fffefb]'>
								<div className='flex justify-end items-center'>
									<span className='cursor-pointer'>
										<div className='cursor-pointer select-none leading-[0] ml-0 mr-[5px] my-0'>
											<svg
												width={16}
												height={17}
												viewBox='0 0 253 263'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z'
													fill='#ee4d2d'
												/>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z'
													fill='#fff'
												/>
											</svg>
										</div>
									</span>
									<div className='text-sm leading-5 text-[rgba(0,0,0,0.8)] ml-0 mr-2.5 my-0'>
										Thành tiền:
									</div>
									<div className='text-[#ee4d2d] text-2xl leading-[30px]'>
										₫{formatPrice(cart?.final_total)}
									</div>
								</div>
							</div>
							<div className='flex flex-nowrap justify-between content-center pt-3 pb-6 px-6 bg-[#fffefb]'>
								<div className='min-w-[300px] max-w-[400px] flex items-center gap-1 gap-1 grow text-left text-xs leading-4 text-[rgba(0,0,0,0.54)]'>
									<span>
										Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản
										phẩm nhận được không có vấn đề nào.
									</span>
								</div>
								<div className='flex'>
									<div className='flex items-center text-ellipsis ml-2.5 mr-0 my-0 min-w-[150px] '>
										<button className='min-h-[40px] min-w-[150px] overflow-hidden text-ellipsis border capitalize bg-[#ee4d2d] text-[#fff] font-normal text-sm  py-2 rounded-sm border-solid border-transparent hover:bg-[#d73211] hover:border-[#ba2b0f]'>
											Đã nhận hàng
										</button>
									</div>
									<div className='flex items-center text-ellipsis ml-2.5 mr-0 my-0 min-w-[210px] '>
										<button
											className='min-h-[40px] min-w-[150px] overflow-hidden text-ellipsis capitalize font-normal text-sm  py-2 rounded-sm px-3 border-solid border-[rgba(0,0,0,0.09)] hover:bg-[rgba(0,0,0,0.02)] hover:border hover:border-solid hover:border-[rgba(0,0,0,0.09)]'
											style={{
												border: '1px solid rgba(0, 0, 0, 0.09)'
											}}>
											Yêu cầu Trả hàng/Hoàn tiền
										</button>
									</div>
									<div className='flex items-center text-ellipsis ml-2.5 mr-0 my-0 min-w-[150px] '>
										<button
											className='min-h-[40px] min-w-[150px] overflow-hidden text-ellipsis capitalize font-normal text-sm   py-2 rounded-sm px-3 border-solid border-[rgba(0,0,0,0.09)] hover:bg-[rgba(0,0,0,0.02)] hover:border hover:border-solid hover:border-[rgba(0,0,0,0.09)]'
											style={{
												border: '1px solid rgba(0, 0, 0, 0.09)'
											}}>
											Liên hệ Người bán
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}
export default memo(PurchasePage)
