import { useState, memo, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { CartModel, UpdateCartDto } from '../../modules/cart/interfaces'
import { useDeleteCartMutation, useGetCartsQuery, useUpdateCartMutation } from '../../modules/cart/hooks'
import { LoadingDefaultComponent } from '../../modules/shared'
import { formatPrice } from '../../utils/formatPrice'
import toast from 'react-hot-toast'
import { AppDispatch, buyCartActions } from '../../redux'

function CartPage(): JSX.Element {
	const navigate = useNavigate()
	const dispatch: AppDispatch = useAppDispatch()
	const [total, setTotal] = useState(0)
	const [checked, setChecked] = useState<any>([])
	const [allChecked, setAllChecked] = useState(false)
	const [buyCart, setBuyCart] = useState<CartModel[]>([])
	const [deleteCart] = useDeleteCartMutation()
	const [updateCart] = useUpdateCartMutation()
	const [data, setData] = useState<[CartModel[]]>([[]])
	const { data: dataCart, isLoading, refetch: fetchCarts } = useGetCartsQuery()

	const [selectedOption, setSelectedOption] = useState<{
		itemIndex: number
		variationIndex: number
	} | null>(null)
	const [agrsUpdate, setAgrsUpdate] = useState({
		cartid: 0,
		payload: {
			amount: 0,
			item_option: ''
		}
	})

	useEffect(() => {
		dataCart?.response && setData(dataCart?.response)
	}, [dataCart])

	const onCheck = (itemid: number) => {
		setChecked((prev: any) => {
			const isChecked = checked.includes(itemid)
			if (isChecked) {
				return checked.filter((item: any) => item !== itemid)
			} else {
				return [...prev, itemid]
			}
		})
	}

	const onAllCheck = () => {
		setAllChecked(!allChecked)
		if (!allChecked) {
			const itemIds = data?.flatMap((item: any) => item.map((e: CartModel) => e.itemid))
			setChecked(itemIds)
		} else {
			setChecked([])
		}
	}

	const onIncrease = async (item: CartModel) => {
		const payload: UpdateCartDto = {
			amount: +item.amount + 1,
			item_option: item.item_option
		}
		const agrs = { cartid: item.id, body: payload }
		await updateCart(agrs).unwrap()
		fetchCarts()
	}

	const onReduced = async (item: CartModel) => {
		const payload: UpdateCartDto = {
			amount: +item.amount - 1,
			item_option: item.item_option
		}
		if (payload.amount === 0) return
		const agrs = { cartid: item.id, body: payload }
		await updateCart(agrs).unwrap()
		fetchCarts()
	}

	const onChangeOption = async (item: CartModel, option: string) => {
		setAgrsUpdate({
			cartid: item.id,
			payload: {
				amount: item?.amount,
				item_option: option
			}
		})
	}

	const onSubmitChangeOption = async () => {
		const agrs = { cartid: agrsUpdate.cartid, body: agrsUpdate.payload }
		const response = await updateCart(agrs).unwrap()
		if (response.err === 0) {
			toast.success('Cập nhật thành công')
			onHideOption()
		}
		fetchCarts()
	}

	const onDeleteCart = async (cartid: number) => {
		await deleteCart(cartid).unwrap()
		fetchCarts()
	}

	const onBuyCart = () => {
		if (buyCart.length > 0) {
			dispatch(buyCartActions.addBuyCart(buyCart))
			navigate('/order')
		}
	}

	const onShowOption = (indexItem: number, index: number) => {
		setSelectedOption({ itemIndex: indexItem, variationIndex: index })
	}

	const onHideOption = () => {
		setSelectedOption(null)
	}

	useEffect(() => {
		const dataTempt: CartModel[] = []
		data?.forEach((item: any) =>
			item.forEach((element: CartModel) => {
				dataTempt.push(element)
			})
		)
		const filteredData = dataTempt.filter((item) => checked.includes(item.itemid))
		if (checked.length === dataTempt.length) {
			setAllChecked(true)
		} else {
			setAllChecked(false)
		}
		setTotal(filteredData.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0))
		setBuyCart(filteredData)
	}, [checked, data])
	return (
		<>
			{isLoading ? (
				<LoadingDefaultComponent />
			) : (
				<>
					{dataCart?.total === 0 ? (
						<div className='flex justify-center items-center pt-[120px]'>
							<img src='/assets/Img/empty-cart.png' alt='emptyCart' />
						</div>
					) : (
						<>
							<div className='bg-[#f5f5f5] overflow-hidden mt-[120px] min-h-[380px]  mb-[100px]'>
								<div className='grid wide pt-[16px]'>
									<div className='sm-gutter'>
										<div className='w-full items-center pt-2.5 pb-[130px] '>
											<div className='flex items-center shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] overflow-hidden h-[55px] text-sm text-[#888] mb-3 px-4 py-0 rounded-[3px] bg-[#fff]'>
												<div className='flex flex-row-reverse min-w-[58px] box-border pl-5 pr-3 py-0'>
													<label className='shopping_cart-checkBox'>
														<input
															type='checkbox'
															checked={allChecked}
															onChange={onAllCheck}
														/>
														<span className='checkmark'></span>
													</label>
												</div>
												<div className='text-[rgba(0,0,0,0.8)] w-[46.27949%]'>Sản Phẩm</div>
												<div className='w-[15.88022%] text-center'>Đơn Giá</div>
												<div className='w-[15.4265%] text-center'>Số Lượng</div>
												<div className='w-[10.43557%] text-center'>Số Tiền</div>
												<div className='w-[12.70417%] text-center'>Thao Tác</div>
											</div>
											{data?.map((item: CartModel[], indexItem: any) => (
												<section
													className='shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] overflow-visible mb-[0.9375rem] rounded-sm bg-[#fff]'
													key={indexItem}>
													<div className='flex items-center h-[3.75rem] box-border px-4 py-0 border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
														<div className='flex items-center flex-1'>
															<NavLink
																className='no-underline text-[rgba(0,0,0,0.87)] font-medium min-w-[50px] flex items-center'
																to={`/shop/${item[0]?.shopid}`}>
																<div className='flex items-center'>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		width={62}
																		height={16}
																		fill='none'>
																		<path
																			fill='#EE4D2D'
																			fillRule='evenodd'
																			d='M0 2C0 .9.9 0 2 0h58a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2z'
																			clipRule='evenodd'
																		/>
																		<g clipPath='url(#clip0)'>
																			<path
																				fill='#fff'
																				d='M8.7 13H7V8.7L5.6 6.3A828.9 828.9 0 004 4h2l2 3.3a1197.3 1197.3 0 002-3.3h1.6L8.7 8.7V13zm7.9-1.7h1.7c0 .3-.2.6-.5 1-.2.3-.5.5-1 .7l-.6.2h-.8c-.5 0-1 0-1.5-.2l-1-.8a4 4 0 01-.9-2.4c0-1 .3-1.9 1-2.6a3 3 0 012.4-1l.8.1a2.8 2.8 0 011.3.7l.4.6.3.8V10h-4.6l.2 1 .4.7.6.5.7.1c.4 0 .7 0 .9-.2l.2-.6v-.1zm0-2.3l-.1-1-.3-.3c0-.2-.1-.2-.2-.3l-.8-.2c-.3 0-.6.2-.9.5l-.3.5a4 4 0 00-.3.8h3zm-1.4-4.2l-.7.7h-1.4l1.5-2h1.1l1.5 2h-1.4l-.6-.7zm8.1 1.6H25V13h-1.7v-.5.1H23l-.7.5-.9.1-1-.1-.7-.4c-.3-.2-.4-.5-.6-.8l-.2-1.3V6.4h1.7v3.7c0 1 0 1.6.3 1.7.2.2.5.3.7.3h.4l.4-.2.3-.3.3-.5.2-1.4V6.4zM34.7 13a11.2 11.2 0 01-1.5.2 3.4 3.4 0 01-1.3-.2 2 2 0 01-.5-.3l-.3-.5-.2-.6V7.4h-1.2v-1h1.1V5h1.7v1.5h1.9v1h-2v3l.2 1.2.1.3.2.2h.3l.2.1c.2 0 .6 0 1.3-.3v1zm2.4 0h-1.7V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.4.4.2.7V13h-1.6V9.3 8.1l-.4-.6-.6-.2a1 1 0 00-.4.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.1.5-.1.9V13zm5.4-6.6H44V13h-1.6V6.4zm-.8-.9l1.8-2h1.8l-2.1 2h-1.5zm7.7 5.8H51v.5l-.4.5a2 2 0 01-.4.4l-.6.3-1.4.2c-.5 0-1 0-1.4-.2l-1-.7c-.3-.3-.5-.7-.6-1.2-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4a2.6 2.6 0 011.6-1.8c.4-.2.9-.3 1.4-.3.6 0 1 .1 1.5.3.4.1.7.4 1 .6l.2.5.1.5h-1.6c0-.3-.1-.5-.3-.6-.2-.2-.4-.3-.8-.3s-.8.2-1.2.6c-.3.4-.4 1-.4 2 0 .9.1 1.5.4 1.8.4.4.8.6 1.2.6h.5l.3-.2.2-.3v-.4zm4 1.7h-1.6V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.3.4.3.7V13h-1.6V9.3L56 8.1c-.1-.3-.2-.5-.4-.6l-.6-.2a1 1 0 00-.3.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.2.5V13z'
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
																		</defs>
																	</svg>
																</div>
																<span className='ml-[10px]'>
																	{item[0]?.overview?.shop_name}
																</span>
															</NavLink>
															<button
																type='button'
																aria-label='chat'
																className='flex ml-[5px] p-0 border-0'>
																<svg
																	viewBox='0 0 16 16'
																	className='text-[#ee4d2d] w-[1.375rem] h-4 cursor-pointer select-none inline-block fill-current relative'>
																	<g fillRule='evenodd'>
																		<path d='M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z' />
																	</g>
																</svg>
															</button>
															<div className='flex-1' />
														</div>
													</div>
													{item.map((ele: CartModel, index: number) => (
														<>
															<section className='relative pb-px' role='list'>
																<div
																	className='no-underline text-[rgba(0,0,0,0.87)] block mt-[15px] pt-0 pb-[15px] px-4'
																	role='listitem'>
																	<div className='flex items-center'>
																		<div className='flex flex-row-reverse min-w-[58px] box-border pl-5 pr-3 py-0'>
																			<label className='shopping_cart-checkBox'>
																				<input
																					type='checkbox'
																					checked={checked.includes(
																						ele.itemid
																					)}
																					onChange={() => onCheck(ele.itemid)}
																				/>
																				<span className='checkmark'></span>
																			</label>
																		</div>
																		<div className='w-[29.03811%] box-border relative flex-col flex'>
																			<div className='flex'>
																				<NavLink
																					to={`/product/${ele.itemid}/${ele.shopid}`}>
																					<img
																						className='w-20 h-20 object-cover'
																						src={ele?.overview?.image}
																						alt={ele?.overview?.name}
																					/>
																				</NavLink>
																				<div className='flex flex-1 flex-col text-sm pl-2.5 pr-5 pt-[5px] pb-0'>
																					<NavLink
																						className='no-underline text-[rgba(0,0,0,0.87)] block max-h-8 text-ellipsis break-all leading-4 overflow-hidden mb-[5px]'
																						style={{
																							display: '-webkit-box',
																							WebkitBoxOrient: 'vertical',
																							WebkitLineClamp: 2
																						}}
																						to={`/product/${ele.itemid}/${ele.shopid}`}>
																						{ele?.overview?.name}
																					</NavLink>
																					<img
																						className='h-[18px] object-contain object-left max-w-[100%]'
																						src='https://down-vn.img.susercontent.com/file/vn-50009109-7cf61bd7bea21aa5d2d1717a196f35e0'
																						alt=''
																					/>
																					<div className='flex text-[#ee4d2d]'>
																						<span />
																					</div>
																				</div>
																			</div>
																		</div>

																		<div className='flex items-center justify-center w-[17.24138%]'>
																			{ele?.item_option !== '' && (
																				<div
																					className='flex items-center justify-between cursor-pointer relative flex-1'
																					style={{
																						background: 'none'
																					}}>
																					<button
																						className='flex-1 text-[rgba(0,0,0,0.54)] flex flex-col text-sm mr-2.5 p-0 border-0'
																						style={{
																							background: 'none'
																						}}
																						onClick={() =>
																							selectedOption &&
																							selectedOption.itemIndex ===
																								indexItem &&
																							selectedOption.variationIndex ===
																								index
																								? onHideOption()
																								: onShowOption(
																										indexItem,
																										index
																									)
																						}>
																						<div className='flex items-center capitalize text-left'>
																							Phân loại hàng:
																							<div
																								className='transition-transform duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] rotate-[0] ml-2.5 mr-0 my-0 p-0 border-t-[5px] border-t-[rgba(0,0,0,0.54)] border-b-0 border-x-4 border-x-transparent border-solid'
																								style={{
																									background: 'none'
																								}}
																							/>
																						</div>
																						<div
																							className='text-ellipsis overflow-hidden text-left'
																							style={{
																								wordBreak: 'break-word',
																								display: '-webkit-box',
																								WebkitBoxOrient:
																									'vertical',
																								WebkitLineClamp: 2
																							}}>
																							{ele?.item_option}
																						</div>
																					</button>
																					{selectedOption &&
																						selectedOption.itemIndex ===
																							indexItem &&
																						selectedOption.variationIndex ===
																							index && (
																							<div
																								className='absolute right-[-1.25rem] z-[100] top-[65%]'
																								role='dialog'>
																								<div>
																									<div className='flex h-2.5 justify-center'>
																										<div className='relative w-0 h-0 border-b-[10px] border-b-[rgba(0,0,0,0.09)] border-x-[10px] border-x-transparent border-solid -bottom-px'>
																											<div className='absolute w-0 h-0 border-b-8 border-b-[#fff] border-x-8 border-x-transparent border-solid -left-2 -bottom-2.5' />
																										</div>
																									</div>
																									<div className='overflow-hidden whitespace-pre-wrap shadow-[0_5px_10px_0_rgba(0,0,0,0.09)] rounded-sm border-[rgba(0,0,0,0.09)] bg-[#fff]'>
																										<div className='flex flex-col w-[19.6875rem] max-h-[28.125rem] overflow-y-auto px-[25px] py-[27px] bg-[#fff]'>
																											<div className='flex flex-wrap'>
																												<div
																													className='mb-[15px]'
																													role='radiogroup'
																													aria-labelledby='variation_label-Size'>
																													<label
																														className='inline-block capitalize text-[rgba(0,0,0,0.54)] text-base mb-2.5'
																														id='variation_label-Size'>
																														{
																															ele
																																.overview
																																.name_tierVariations
																														}

																														:
																													</label>
																													<div>
																														{ele?.overview?.option_tierVariations[0]
																															?.split(
																																','
																															)
																															?.map(
																																(
																																	option: any,
																																	index_variations: number
																																) => (
																																	<button
																																		key={
																																			index_variations
																																		}
																																		style={{
																																			outline: 0,
																																			wordBreak:
																																				'break-word'
																																		}}
																																		className={`overflow-visible bg-[#fff] cursor-pointer min-w-[5rem] min-h-[2.125rem] box-border text-[rgba(0,0,0,0.8)] text-left border relative inline-flex items-center justify-center ml-0 mr-2 mt-0 mb-2 px-3 py-1 rounded-sm border-solid border-[rgba(0,0,0,0.09)] ${
																																			option ===
																																			agrsUpdate
																																				?.payload
																																				?.item_option
																																				? '!text-[#ee4d2d] !border-[#ee4d2d]'
																																				: ''
																																		}`}
																																		onClick={() =>
																																			onChangeOption(
																																				ele,
																																				option
																																			)
																																		}>
																																		{
																																			option
																																		}
																																		{option ===
																																			agrsUpdate
																																				?.payload
																																				?.item_option && (
																																			<div className="w-[0.9375rem] h-[0.9375rem] absolute overflow-hidden right-0 bottom-0 before:content-[''] before:absolute before:right-[-0.9375rem] before:border-b-[#ee4d2d] before:border-[0.9375rem] before:border-solid before:border-transparent before:bottom-0">
																																				<svg
																																					enableBackground='new 0 0 12 12'
																																					viewBox='0 0 12 12'
																																					x={
																																						0
																																					}
																																					y={
																																						0
																																					}
																																					className='absolute text-[#fff] text-[8px] inline-block w-[1em] h-[1em] fill-current right-0 bottom-0'>
																																					<g>
																																						<path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z' />
																																					</g>
																																				</svg>
																																			</div>
																																		)}
																																	</button>
																																)
																															)}
																													</div>
																												</div>
																												<div className='flex gap-[10px] items-center justify-end'>
																													<button className='overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] border flex items-center justify-center capitalize min-h-[40px]  h-[25px] min-w-[120px] text-[0.9rem] leading-[1.6rem] no-underline px-3 py-0 rounded-sm border-solid border-[#ccc]'>
																														TRỞ
																														LẠI
																													</button>
																													<button
																														onClick={
																															onSubmitChangeOption
																														}
																														className='min-h-[40px]  h-[25px] min-w-[120px] overflow-hidden text-ellipsis border capitalize  font-normal text-sm  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
																														Xác
																														nhận
																													</button>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						)}
																				</div>
																			)}
																		</div>

																		<div className='flex-col w-[15.88022%] flex items-center justify-center'>
																			<div className='flex gap-[10px] items-center'>
																				{ele?.overview
																					?.price_before_discount !== 0 && (
																					<span className='text-[rgba(0,0,0,0.54)] line-through'>
																						đ
																						{formatPrice(
																							ele?.overview
																								?.price_before_discount
																						)}
																					</span>
																				)}

																				<span className='text-[rgba(0,0,0,0.87)]'>
																					₫{formatPrice(ele?.overview?.price)}
																				</span>
																			</div>
																		</div>
																		<div className='flex items-center justify-center flex-col w-[15.4265%]'>
																			<div className='flex items-center'>
																				<button
																					className='text-sm font-light leading-none tracking-[0] flex items-center justify-center transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] border text-[rgba(0,0,0,0.8)] w-8 h-8 rounded-tr-none rounded-br-none rounded-sm border-solid border-[rgba(0,0,0,0.09)]-'
																					style={{
																						background: 'transparent'
																					}}
																					aria-label='cart_accessibility_quantity_decrease_button'
																					onClick={() => onReduced(ele)}>
																					<svg
																						enableBackground='new 0 0 10 10'
																						viewBox='0 0 10 10'
																						x={0}
																						y={0}
																						className='text-[10px] w-2.5 h-2.5 shrink-0 fill-current relative inline-block'>
																						<polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
																					</svg>
																				</button>

																				<button
																					className='cursor-pointer text-sm font-light leading-none tracking-[0] flex items-center justify-center transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] border text-[rgba(0,0,0,0.8)] w-8 h-8 text-[#ccc] rounded-sm  border-solid border-[rgba(0,0,0,0.09)]'
																					style={{
																						background: 'transparent'
																					}}
																					aria-label='cart_accessibility_quantity_increase_button'
																					disabled>
																					{+ele.amount}
																				</button>

																				<button
																					className='text-sm font-light leading-none tracking-[0] flex items-center justify-center transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] border text-[rgba(0,0,0,0.8)] w-8 h-8 rounded-tl-none rounded-bl-none rounded-sm border-solid border-[rgba(0,0,0,0.09)]'
																					style={{
																						background: 'transparent'
																					}}
																					aria-label='cart_accessibility_quantity_increase_button'
																					onClick={() => onIncrease(ele)}>
																					<svg
																						enableBackground='new 0 0 10 10'
																						viewBox='0 0 10 10'
																						x={0}
																						y={0}
																						className='text-[10px] w-2.5 h-2.5 shrink-0 fill-current relative inline-block'>
																						<polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
																					</svg>
																				</button>
																			</div>
																		</div>
																		<div className='flex items-center justify-center w-[10.43557%] text-[#ee4d2d]'>
																			<span>
																				₫
																				{formatPrice(
																					ele?.overview?.price,
																					ele?.amount
																				)}
																			</span>
																		</div>
																		<div className='flex items-center justify-center w-[12.70417%] capitalize flex-col'>
																			<button
																				onClick={() =>
																					onDeleteCart(ele?.itemid)
																				}>
																				Xóa
																			</button>
																			<div className='z-[2] max-w-full'>
																				<button className='text-sm  leading-none tracking-[0] flex items-center justify-center transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] relative overflow-visible text-[rgba(0,0,0,0.8)] bg-[initial] px-[0.4375rem] py-[0.3125rem] border-0 text-[#ee4d2d] font-normal  h-[1.875rem] max-w-full border-solid border-transparent'>
																					<span className='text-[#ee4d2d] font-normal'>
																						Tìm sản phẩm tương tự
																					</span>
																					<svg
																						enableBackground='new 0 0 15 15'
																						viewBox='0 0 15 15'
																						x={0}
																						y={0}
																						className='h-[1em] fill-[#ee4d2d] relative w-2.5 inline-block align-middle ml-1'>
																						<path d='m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z' />
																					</svg>
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
															</section>
														</>
													))}
												</section>
											))}
										</div>
									</div>
								</div>
							</div>

							<div className='bg-[#f5f5f5] overflow-hidden fixed bottom-0 inset-x-0 z-10 '>
								<div className='grid wide'>
									<section className="grid grid-cols-[1fr_20.3125rem_11.875rem] items-center box-border w-full flex-1 text-base relative mt-3 bg-[#fff] transition-[background] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] rounded-none before:content-[''] before:absolute before:top-[-1.25rem] before:h-5 before:w-full before:left-0">
										<h2></h2>
										<div className='flex !justify-end min-w-[58px] box-border col-start-1 col-end-2 flex-[0_0_auto] pl-5 pr-3 py-3'>
											<div className='flex items-center gap-[10px]'>
												<svg
													fill='none'
													viewBox='0 -2 23 22'
													className='text-[#ee4d2d] fill-current w-[1.3125rem] h-5 inline-block relative'>
													<g filter='url(#voucher-filter0_d)'>
														<mask id='a' fill='#fff'>
															<path
																fillRule='evenodd'
																clipRule='evenodd'
																d='M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z'
															/>
														</mask>
														<path
															d='M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z'
															mask='url(#a)'
														/>
													</g>
													<path
														clipRule='evenodd'
														d='M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z'
													/>
													<defs>
														<filter
															id='voucher-filter0_d'
															x={0}
															y={1}
															width={20}
															height={16}
															filterUnits='userSpaceOnUse'
															colorInterpolationFilters='sRGB'>
															<feFlood floodOpacity={0} result='BackgroundImageFix' />
															<feColorMatrix
																in='SourceAlpha'
																values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
															/>
															<feOffset />
															<feGaussianBlur stdDeviation='.5' />
															<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0' />
															<feBlend
																in2='BackgroundImageFix'
																result='effect1_dropShadow'
															/>
															<feBlend
																in='SourceGraphic'
																in2='effect1_dropShadow'
																result='shape'
															/>
														</filter>
													</defs>
												</svg>
												<div className='font-medium shrink-0 mx-2  my-0'>Shopee Voucher</div>
											</div>
											<button className='capitalize text-[#05a] text-sm whitespace-nowrap cursor-pointer  p-0 border-0 bg-none'>
												Chọn hoặc nhập mã
											</button>
										</div>
										<div className='col-start-1 col-end-4 border-t-[rgba(0,0,0,0.09)] border-t border-dashed _1Xi-wS' />
										<h3></h3>
										<div className='flex !justify-end min-w-[58px] box-border col-start-1 col-end-2 flex-[0_0_auto] pl-5 pr-3 py-3'>
											<label className='shopping_cart-checkBox'>
												<label htmlFor='check-All' className='hidden'>
													check
												</label>
												<input type='checkbox' id='check-All' disabled />
												<span className='checkmark'></span>
											</label>
											<div className='flex items-center justify-start col-start-2 col-end-3 text-sm box-border'>
												<div className='font-medium shrink-0 ml-2'>Shopee Xu</div>
												<div className='font-medium flex-initial text-[#929292] mx-[17px]'>
													Bạn chưa chọn sản phẩm
												</div>
												<div className='col-start-3 col-end-4 justify-end flex items-center font-medium text-[#d0d0d0]'>
													-₫0
												</div>
											</div>
										</div>
										<div className='col-start-1 col-end-4 border-t-[rgba(0,0,0,0.09)] border-t border-dashed ' />
										<div className='col-start-1 col-end-4 flex items-center flex-1 w-full pl-5 pr-3 py-3'>
											<h3></h3>
											<div className='flex flex-row-reverse min-w-[58px] box-border pl-5 pr-3 py-0 '>
												<label className='shopping_cart-checkBox'>
													<input type='checkbox' checked={allChecked} onChange={onAllCheck} />
													<span className='checkmark'></span>
												</label>
											</div>
											<button className='cursor-pointer'>Chọn Tất Cả ({dataCart?.total})</button>
											<button className='mx-2 my-0'>Xóa</button>
											<div />
											<button className='text-[#ee4d2d] max-w-[168px] whitespace-nowrap overflow-hidden text-ellipsis mx-2 my-0'>
												Lưu vào mục Đã thích
											</button>
											<div className='flex-1' />
											<div className='flex flex-col' role='region'>
												<div className='items-center flex justify-end'>
													<div className='flex items-center ml-5'>
														<div className='text-base text-[#222] leading-[19px]'>
															Tổng thanh toán ({checked?.length} Sản Phẩm):
														</div>
														<div className='text-2xl leading-7 text-[#ee4d2d] ml-[5px]'>
															₫ {total.toLocaleString('it-IT')}
														</div>
													</div>
												</div>
												<div className='flex justify-end text-sm mt-px' />
											</div>
											<button
												onClick={onBuyCart}
												className='min-h-[40px]  h-[30px] min-w-[210px] overflow-hidden text-ellipsis border capitalize  font-normal text-sm  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
												Mua hàng
											</button>
										</div>
									</section>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	)
}

export default memo(CartPage)
