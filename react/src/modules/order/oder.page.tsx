import { toast } from 'react-hot-toast'
import { useState, memo, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux'
import { useAppSelector } from '../../hooks/hooks'
import { formatPrice } from '../../utils/formatPrice'
import { useDeleteCartMutation } from '../../modules/cart/hooks'
import { useCreateOrderMutation } from '../../modules/order/hooks'
import { LoadingCustomComponent } from '../../modules/shared/loading'
import { useTranslation } from 'react-i18next'
import { CreateOrderDto } from './interfaces'
import { CartModel } from '../cart/interfaces'

function OderPage(): JSX.Element {
	const ship = 30000
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { data } = useAppSelector((state: RootState) => state.buyCart)
	const { data: dataUser } = useAppSelector((state: RootState) => state.user)
	const [loading, setLoading] = useState(false)
	const [total, setTotal] = useState(0)
	const [totalShip, setTotalShip] = useState(0)
	const [dataPayload, setDataPayload] = useState<CreateOrderDto[]>([])
	const [deleteCart] = useDeleteCartMutation()
	const [createOrder] = useCreateOrderMutation()

	useEffect(() => {
		const dataTempt: CartModel[] = []
		data?.forEach((item: any) => {
			item.forEach((element: CartModel) => {
				dataTempt.push(element)
			})
		})
		setTotalShip((data?.length ?? 1) * ship)
		setTotal(dataTempt.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0))

		if (dataTempt.length === 0) {
			navigate('/cart')
		}
		const newData: CreateOrderDto[] = data.map((item: CartModel[]) => {
			return {
				item_groups_id: item.map((ele) => ele.itemid)?.join(','),
				amount: item.map((ele) => ele.amount)?.join(', '),
				item_option: item.map((ele) => ele.item_option)?.join(','),
				final_total: item.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0) + ship,
				shopid: item[0]?.shopid,
				tierVariation: item.map((ele) => ele.tierVariation)?.join(','),
				shop_name: item[0]?.overview?.shop_name,
				total_num_items: item.length,
				note: ''
			}
		})

		setDataPayload(newData)
	}, [data, ship, navigate])

	const updateNote = (newNote: string, index: number) => {
		dataPayload[index].note = newNote
	}

	const handelSubmit = async () => {
		try {
			if (!dataUser.phone) {
				return (
					toast.error(t(`ORDER.VALIDATOR.INVALID_PHONE`)),
					setTimeout(() => {
						navigate('/user/profile')
					}, 3000)
				)
			}
			if (!dataUser.address) {
				return (
					toast.error(t(`ORDER.VALIDATOR.INVALID_ADDRESS`)),
					setTimeout(() => {
						navigate('/user/profile')
					}, 3000)
				)
			}
			setLoading(true)
			const response = await createOrder(dataPayload).unwrap()
			if (response.err === 0) {
				toast.success(response.msg)
				for (const item of data) {
					for (const ele of item) {
						deleteCart(ele.id).unwrap()
						setTimeout(() => {
							navigate('/user/purchase')
						}, 3000)
					}
				}
			}
		} catch (err: any) {
			toast.error(err.msg.toString())
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{loading && <LoadingCustomComponent />}

			<div className='p-[1.25rem] mt-[120px]' style={{ backgroundColor: '#f5f5f5' }}>
				<div className='grid wide'>
					<div
						className='h-[3px] w-full bg-[116px_3px] bg-[repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6_33px,transparent_0,transparent_41px,#f18d9b_0,#f18d9b_74px,transparent_0,transparent_82px)]'
						style={{ backgroundPositionX: '-30px' }}></div>
					<div className='bg-[#fff] mb-2.5 pt-7 pb-6 px-[30px]'>
						<h1 className=' flex items-center text-lg text-[#ee4d2d] uppercase mb-[20px]'>
							<i className='fa-solid fa-location-dot pr-2.5'></i>
							Địa Chỉ Nhận Hàng
						</h1>
						<div>
							<div className='font-bold text-[#222] inline pr-2.5'>
								{dataUser.name} {dataUser.phone ? `SĐT: (+84) ${dataUser.phone}` : ''}
							</div>
							<div className='font-bold text-[#222] inline pr-2.5'>
								{dataUser.phone ? `Mặc Định: ${dataUser.address} ` : ''}
							</div>
						</div>
					</div>

					{data?.map((ele: CartModel[], index: number) => (
						<div key={index}>
							<div className=' overflow-x-hidden overflow-y-auto'>
								<div>
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
																<path
																	fill='#fff'
																	d='M0 0h55v16H0z'
																	transform='translate(4)'
																/>
															</clipPath>
															<clipPath id='clip1'>
																<path
																	fill='#fff'
																	d='M0 0h7v16H0z'
																	transform='translate(59)'
																/>
															</clipPath>
														</defs>
													</svg>
												</div>
												<div className='max-w-[200px] text-sm font-semibold overflow-hidden text-ellipsis ml-2 mr-0 my-0'>
													{ele[0]?.overview?.shop_name}
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
												<NavLink
													className='ml-2 mr-0 my-0'
													to={`/shop/${ele[0]?.overview?.shopid}`}>
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
										</div>
									</div>
									<hr className='border-b-[rgba(0,0,0,0.06)] border-b border-solid' />
									{ele?.map((item: CartModel) => (
										<div
											style={{ padding: '10px 30px' }}
											className='bg-[#fff] grid items-center  border-b-[rgba(0,0,0,0.09)] border-b border-dashed'
											key={item.id}>
											<div className='flex items-center'>
												<div className='flex-1 items-start flex-nowrap flex pl-0 pr-3 py-0'>
													<div className=' w-[81px] h-[81px]'>
														<NavLink className='relative' to=''>
															<div className='w-20 h-20 mr-3'>
																<img
																	className='w-full h-full'
																	src={item?.overview?.image}
																	alt={item?.overview?.name}
																/>
															</div>
															<div
																className='bg-[50%] bg-cover bg-no-repeat absolute w-full h-full left-0 top-0'
																style={{
																	backgroundImage: `${item?.overview?.image}`
																}}>
																<div className='w-full h-full'></div>
															</div>
														</NavLink>
													</div>

													<div className='min-w-0 flex flex-1 flex-col items-start pl-3 pr-0 py-0'>
														<NavLink to='/'>
															<div
																className='overflow-hidden text-ellipsis text-base leading-22 max-h-12 mt-0 mb-[5px] mx-0'
																style={{
																	display: '-webkit-box',
																	WebkitBoxOrient: 'vertical',
																	WebkitLineClamp: 2
																}}>
																<span>{item?.overview?.name}</span>
															</div>
														</NavLink>
														<div className='mt-0 mx-0'>
															<div className='text-[rgba(0,0,0,0.54)] mb-[5px]'>
																Phân loại hàng: {item.tierVariation}:{' '}
																{item?.item_option[index]}
															</div>
														</div>
													</div>
												</div>
												<div>
													<div>
														<span className='align-middle text-sm leading-4 text-[rgba(0,0,0,0.87)]'>
															<div
																className='text-sm flex justify-center flex-col text-center  font-medium'
																style={{
																	flexDirection: 'row',
																	gap: '8px'
																}}>
																<h3 className='line-through text-[#ccc]'>
																	đ {formatPrice(item?.overview?.price_max)}
																</h3>
																<h3 className='px-[5px] text-center text-[rgba(0,0,0,0.54)]'>
																	x{item.amount}
																</h3>
																<h3 className='text-[#ee4d2d]'>
																	đ đ{' '}
																	{formatPrice(item?.overview?.price, item?.amount)}
																</h3>
															</div>
														</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className='flex bg-[#fafdff] min-w-0 min-h-0 border-b-[rgba(0,0,0,0.09)] border-b border-dashed'>
								<div className='flex items-center min-w-0 min-h-0 text-sm flex-[4] pr-5'>
									<span className='flex min-w-0 min-h-0 px-[30px] py-4 border-t-0'>Lời nhắn:</span>
									<div className='flex items-center shadow-[inset_0_2px_0_0_rgb(0_0_0_/_2%)] h-10 bg-[#fff] box-border border flex-1 text-xs font-light ml-[15px] mb-0 rounded-sm border-solid border-[rgba(0,0,0,0.14)]'>
										<input
											className='w-full h-10 box-border bg-transparent flex-1 text-sm min-w-0 text-[#222] p-2.5 border-0'
											placeholder='Lưu Ý Cho Người Bán...'
											type='text'
											onChange={(e) => updateNote(e.target.value, index)}></input>
									</div>
								</div>
								<div className='flex-[6] justify-items-center p-4 border-l-[rgba(0,0,0,0.09)] border-l border-dashed'>
									<div
										className='items-center grid-cols-[1fr_0.6fr_1fr_0.3fr]'
										style={{ display: 'grid' }}>
										<span className='min-w-0 min-h-0 flex flex-[0_0_auto] text-[#00bfa5] col-start-1 col-end-2 pl-5'>
											Đơn vị vận chuyển
										</span>
										<p>Nhanh</p>
										<label className='row-start-1 select-none col-start-3 row-end-2 text-center uppercase text-[#05a] cursor-pointer'>
											Thay Đổi
										</label>
										<h2> đ {ship.toLocaleString('it-IT')}</h2>
									</div>
									<div className='text-[#888] text-xs mt-[5px] pl-5'>
										<p>Nhận hàng vào 27 Th08 - 30 Th08</p>
										<p> (Nhanh tay vào ngay "Shopee Voucher" để săn mã Miễn phí vận chuyển nhé!)</p>
									</div>
								</div>
							</div>
							<div className='bg-[#fafdff] items-center text-right mb-2.5 pt-4 pb-5 px-[30px]'>
								<span className='text-sm text-[#929292]'>
									Tổng số tiền ({ele?.reduce((acc: any, curr: any) => acc + curr.amount, 0)} sản
									phẩm):
								</span>
								<label className='text-xl text-[#ee4d2d] ml-5'>
									đ
									{(
										ele?.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0) + ship
									).toLocaleString('it-IT')}
								</label>
							</div>
						</div>
					))}
					<div className='shadow-[0_1px_1px_0rgba_(0,0,0,0.05)] text-right pr-[25px] pt-[15px] border-t-[#f1f0ed] border-t border-solid bg-[#fffefb]'>
						<div>
							<div
								className='grid grid-cols-[6fr_1fr_1fr] pb-5 border-b-[rgba(0,0,0,0.09)] border-b border-dashed'
								style={{ display: 'grid' }}>
								<div></div>
								<div>
									<h3 className='text-sm text-[rgba(0,0,0,0.54)] leading-10'>Tổng tiền hàng</h3>
									<h3 className='text-sm text-[rgba(0,0,0,0.54)] leading-10'>Phí vận chuyển</h3>
									<h3 className='text-sm text-[rgba(0,0,0,0.54)] leading-10'>Tổng thanh toán:</h3>
								</div>
								<div>
									<h3 className='text-sm text-[rgba(0,0,0,0.54)] leading-10'>
										đ{formatPrice(total)}
									</h3>
									<h3 className='text-sm text-[rgba(0,0,0,0.54)] leading-10'>
										đ{formatPrice(totalShip)}
									</h3>
									<h2 className='text-[1.75rem] text-[#ee4d2d] h-10 min-w-[100px]'>
										₫{formatPrice(total, 0, totalShip)}
									</h2>
								</div>
							</div>
							<div className='min-h-[95px] flex justify-between items-center mt-2.5 mb-0 mx-0 pl-[30px] pr-[25px] py-0'>
								<div className='text-sm bg-[#fffdf8] text-[rgba(0,0,0,0.54)] px-[15px] py-0'>
									Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
									<NavLink className='no-underline' to='https://shopee.vn/legaldoc/policies'>
										Điều khoản Shopee
									</NavLink>
								</div>
								<button
									onClick={handelSubmit}
									className='min-h-[40px]  h-[30px] min-w-[210px] overflow-hidden text-ellipsis border capitalize bg-[#ee4d2d] text-[#fff] font-normal text-sm  py-2 rounded-sm border-solid border-transparent hover:bg-[#d73211] hover:border-[#ba2b0f]'>
									Đặt hàng
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default memo(OderPage)
