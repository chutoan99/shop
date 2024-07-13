import { toast } from 'react-hot-toast'
import { memo, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/hooks'
import { useCreateCartMutation, useGetCartsQuery } from '../../cart/hooks'
import { formatPrice } from '../../../utils/formatPrice'
import { AppDispatch, CartActions } from '../../../redux'
import { useTranslation } from 'react-i18next'
import { generateStart } from '../helpers'
import { useCounter, useToggle } from '../../../hooks'
import { ProductDetailModel } from '../interfaces'
import { CreateCartDto } from '../../cart/interfaces'

type ProductDetailProps = {
	data: ProductDetailModel
}
function ProductDetailComponent({ data }: ProductDetailProps): JSX.Element {
	const { t } = useTranslation()
	const params = useParams()
	const dispatch: AppDispatch = useAppDispatch()
	const [createCart] = useCreateCartMutation()
	const { data: dataCart, refetch: FetchCarts } = useGetCartsQuery()
	const [value, toggle] = useToggle(false)
	const [indexImg, setIndexImg] = useState(0)
	const [showTableSize, setShowTableSize] = useState(false)
	const { count, increment, decrement } = useCounter(1, data.stock, 1)
	const [payload, setPayload] = useState<CreateCartDto>({
		itemid: 0,
		shopid: 0,
		amount: count,
		item_option: '',
		tierVariation: ''
	})

	useEffect(() => {
		setPayload((prev: CreateCartDto) => {
			return {
				...prev,
				itemid: Number(params.itemid),
				shopid: Number(params.shopid)
			}
		})
	}, [params])

	useEffect(() => {
		setPayload((prev: CreateCartDto) => {
			return {
				...prev,
				amount: count
			}
		})
	}, [count])

	useEffect(() => {
		dataCart?.total && dispatch(CartActions.updateTotalCart(dataCart?.total))
	}, [dataCart])

	const onAddToCart = async () => {
		if (payload.item_option === '' && data?.name_tierVariations) {
			return toast.error(t('CART.MESSAGE.CHOOSE_PRODUCT'))
		}
		const response = await createCart(payload).unwrap()
		if (response.err === 0) {
			setPayload((prev: CreateCartDto) => {
				return {
					...prev,
					itemid: 0,
					shopid: 0,
					amount: 1,
					item_option: '',
					tierVariation: ''
				}
			})
			toast.success(t('CART.MESSAGE.ADD_CART'))
			FetchCarts()
		}
	}

	return (
		<>
			<div className='grid wide'>
				<div className='row sm-gutter pb-[30px] bg-[#fff]'>
					<div className='col c-12 mo-5 l-5'>
						<div className='relative w-full cursor-pointer pt-[20px] pb-10 p-[3px]'>
							<img alt='' onClick={toggle} src={data?.image} className='w-full relative' />
						</div>
						<div className='row sm-gutter'>
							<div
								className='col s-12 c-12  l-12 flex-nowrap overflow-x-auto'
								style={{
									display: 'flex'
								}}>
								{data?.images[0]?.split(',')?.map((image: string, index: number) => {
									return (
										<div
											className='cursor-pointer flex h-[82px] shrink-0 w-[82px] mr-[19px]'
											key={index}>
											<img src={image} alt='MobileImgProduct' onClick={toggle} />
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className='col c-12 mo-7 l-7 '>
						<div className='p-[10px]'>
							<div className='pb-[10px]'>
								<h2 className='text-[#333] text-[1.375rem] font-medium leading-7 rounded-[5px]'>
									<span className='bg-[#ee4d2d] text-[#fff] text-xs mr-2.5 p-[3.5px]'>Yêu Thích</span>
									{data?.name}
								</h2>
							</div>
							<div className='flex text-[#222]'>
								<div className='flex justify-center text-base items-center text-[#ee4d2d] pr-3 border-r-[rgba(0,0,0,0.14)] border-r border-solid'>
									<h3 className='mr-[5px] pb-[3px] border-b-[#ee4d2d] border-b border-solid'>
										{data?.shop_info?.rating_star?.toFixed(1)}
									</h3>
									<div className='flex text-[#ee4d2d]'>{generateStart(5)}</div>
								</div>
								<div className='flex text-base relative pl-2.5 pr-3 border-r-[rgba(0,0,0,0.14)] border-r border-solid'>
									<h3 className='text-[#222] pb-[3px] border-b-[#555] border-b border-solid mr-[5px]'>
										47
									</h3>
									<h4 className='text-sm text-[#767676] capitalize'>Đánh Giá</h4>
								</div>
								<div className='flex text-base relative text-[#222] justify-center items-center mb-[unset] pl-2.5'>
									<h3 className='mr-[5px]'>{data?.historical_sold}</h3>
									<h4 className='text-sm text-[#767676] capitalize'>Đã bán</h4>
								</div>
							</div>
							<div className='bg-neutral-100 flex items-center mt-[15px] mb-[30px] mx-0 px-2.5 py-[15px]'>
								<div>
									{data?.price_before_discount !== 0 && (
										<h3 className='text-base line-through text-[#929292] mr-2.5'>
											<sup className='text-[75%] leading-[0] relative align-baseline top-[-7px]'>
												đ
											</sup>
											{formatPrice(data?.price_min_before_discount)}
										</h3>
									)}
								</div>
								<div>
									{data?.price_min === data?.price_max ? (
										<h3 className='text-[#ee4d2d] font-medium leading-9 text-3xl px-2.5'>
											<sup className='text-[75%] leading-[0] relative align-baseline top-[-7px]'>
												đ
											</sup>
											{formatPrice(data?.price_min)}
										</h3>
									) : (
										<h3 className='text-[#ee4d2d] font-medium leading-9 text-3xl px-2.5'>
											<sup className='text-[75%] leading-[0] relative align-baseline top-[-7px]'>
												đ
											</sup>
											{formatPrice(data?.price_min)} -{' '}
											<sup className='text-[75%] leading-[0] relative align-baseline top-[-7px]'>
												đ
											</sup>
											{formatPrice(data?.price_max)}
										</h3>
									)}
								</div>
								{data?.discount && (
									<span className='bg-[#ee4d2d] text-[#fff] text-xs font-semibold leading-3 uppercase whitespace-nowrap px-1 py-0.5 rounded-sm'>
										{data?.discount} giảm
									</span>
								)}
							</div>
							<div
								style={{
									display: 'grid',
									gridTemplateAreas: "'aa bb'",
									columnGap: '20px'
								}}>
								{data?.voucher && (
									<>
										<div className='gap-y-2.5 flex flex-wrap mb-[25px]'>
											<h3 className='text-[#757575] w-[110px] capitalize shrink-0'>
												Mã Giảm Giá Của Shop
											</h3>
										</div>
										<div className='gap-y-2.5 flex flex-wrap mb-[25px]'>
											<label className='h-[25px] text-sm text-[#ee4d2d] bg-[rgba(255,87,34,0.1)] leading-[1.05rem] rounded mr-2.5 p-2 flex items-center'>
												{data?.voucher?.voucher_code}
											</label>
										</div>
									</>
								)}

								<div className='gap-y-2.5 flex flex-wrap mb-[25px]'>
									<h3 className='text-[#757575] w-[110px] capitalize shrink-0'>Deal Sốc</h3>
								</div>
								<div className='gap-y-2.5 flex flex-wrap mb-[25px]'>
									<label className='h-[25px] text-sm text-[#ee4d2d] bg-[rgba(255,87,34,0.1)] leading-[1.05rem] rounded mr-2.5 p-2 flex items-center'>
										Mua Kèm Deal Sốc
									</label>
								</div>
								{data?.name_tierVariations && (
									<>
										<div className='mt-[5px]'>
											<h3 className='text-[#757575] w-[110px] capitalize shrink-0'>
												{data?.name_tierVariations}
											</h3>
										</div>
										<div className='flex-wrap flex max-w-[32.1875rem]'>
											{data?.option_tierVariations[0]
												?.split(',')
												?.map((option: string, index: number) => (
													<button
														key={index}
														style={{
															outline: 0,
															wordBreak: 'break-word'
														}}
														className={`overflow-visible bg-[#fff] cursor-pointer min-w-[5rem] min-h-[2.125rem] box-border text-[rgba(0,0,0,0.8)] text-left border relative inline-flex items-center justify-center ml-0 mr-2 mt-0 mb-2 px-3 py-1 rounded-sm border-solid border-[rgba(0,0,0,0.09)] ${
															payload.item_option === option
																? '!text-[#ee4d2d] !border-[#ee4d2d]'
																: ''
														}`}
														onClick={() =>
															setPayload((prev: ICartData) => {
																return {
																	...prev,
																	tierVariation: data?.name_tierVariations,
																	item_option: option
																}
															})
														}>
														{option}
														{payload.item_option === option && (
															<div className="w-[0.9375rem] h-[0.9375rem] absolute overflow-hidden right-0 bottom-0 before:content-[''] before:absolute before:right-[-0.9375rem] before:border-b-[#ee4d2d] before:border-[0.9375rem] before:border-solid before:border-transparent before:bottom-0">
																<svg
																	enableBackground='new 0 0 12 12'
																	viewBox='0 0 12 12'
																	x={0}
																	y={0}
																	className='absolute text-[#fff] text-[8px] inline-block w-[1em] h-[1em] fill-current right-0 bottom-0'>
																	<g>
																		<path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z' />
																	</g>
																</svg>
															</div>
														)}
													</button>
												))}
										</div>
									</>
								)}

								{data?.size_chart && (
									<h3
										className='text-[#0055aa] cursor-pointer col-[2/3] text-sm leading-[1.05rem] capitalize'
										onClick={() => setShowTableSize(true)}>
										bảng quy đổi kích thước
									</h3>
								)}

								{showTableSize && (
									<div
										className='w-full h-full fixed bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-[9000] left-0 top-0'
										style={{
											WebkitBoxAlign: 'center',
											WebkitBoxPack: 'center',
											backgroundColor: 'rgba(0, 0, 0, 0.4)'
										}}
										onClick={() => setShowTableSize(false)}>
										<div className='flex-initial relative max-w-full max-h-full'>
											<img src={data?.size_chart} alt='tableSize' />
										</div>
									</div>
								)}
								<>
									<div className='items-center text-[#757575] text-sm leading-[1.05rem] capitalize flex mt-4'>
										<h3 className='text-[#757575] w-[110px] capitalize shrink-0'>số lượng</h3>
									</div>
									<div className='items-center text-[#757575] text-sm leading-[1.05rem] capitalize flex mt-4'>
										<div>
											<button
												type='button'
												aria-label='decrement'
												onClick={decrement}
												className='w-10 h-[30px] border cursor-pointer border-solid border-[#ccc]'>
												<i className='fa-solid fa-minus'></i>
											</button>
											<button className='w-10 h-[30px] border cursor-pointer border-solid border-[#ccc]'>
												{payload.amount}
											</button>
											<button
												type='button'
												aria-label='Increase'
												onClick={increment}
												className='w-10 h-[30px] border cursor-pointer border-solid border-[#ccc]'>
												<i className='fa-solid fa-plus'></i>
											</button>
										</div>
										<span className='text-[#757575] text-sm leading-[1.05rem] ml-2.5'>
											{data?.stock} sản phẩm có sẵn
										</span>
									</div>
								</>
							</div>
							<div className='text-black flex text-[0.875rem] leading-[1.05rem] pt-[30px]'>
								<button
									className='min-w-[11.25rem] text-sm flex items-center justify-center capitalize box-border text-ellipsis h-12 max-w-[250px] text-[#ee4d2d] !border shadow-[0_1px_1px_0_rgba(0,0,0,0.03)] relative overflow-visible flex-row mr-[0.9375rem] px-[20px] py-0 rounded-sm !border-solid !border-[#ee4d2d]'
									onClick={onAddToCart}
									style={{
										WebkitLineClamp: '1',
										background: 'rgba(255, 87, 34, 0.1)',
										outline: '0'
									}}>
									<span
										style={{
											animationName: 'cartPlus',
											animationDelay: '1s',
											animationDuration: '4s'
										}}>
										<i className='fa-solid fa-cart-plus mr-[10px]'></i>
									</span>
									Thêm Vào Giỏ Hàng
								</button>
								<NavLink
									to='/cart'
									className='flex justify-center items-center min-h-[48px]  h-[30px] min-w-[115px] overflow-hidden text-ellipsis border capitalize  font-normal text-[1rem]  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f] hover:text-[#fff]'>
									Mua Ngay
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
			{value && (
				<div
					className='w-full h-full fixed bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-[9000] left-0 top-0'
					style={{
						WebkitBoxAlign: 'center',
						WebkitBoxPack: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.4)'
					}}>
					<div className="flex-initial  max-w-full max-h-full bg-[#fff] w-[836px] h-[540px] content-[''] flex absolute m-auto inset-y-0">
						<div className=' ml-3 mr-0 my-3'>
							<div className='w-[516px] h-[516px]'>
								<img src={data?.images[0]?.split(',')[indexImg]} alt='img' />
							</div>
						</div>
						<div className='w-[285px] h-[540px] ml-3 mr-0 my-3'>
							<div className='l-12 mo-12 c-12'>
								<div
									className='flex text-lg mb-1.5 cursor-pointer '
									onClick={toggle}
									style={{
										justifyContent: 'end'
									}}>
									<i className='fa-regular fa-circle-xmark'></i>
								</div>
								<div
									className='overflow-hidden text-ellipsis text-[0.938rem] text-black font-[350] mr-3 mb-2 pl-3'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: '2',
										wordWrap: 'break-word'
									}}>
									<h3>{data?.name}</h3>
								</div>
								<div className='flex flex-wrap'>
									{data?.images &&
										data?.images[0].split(',')?.map((image: string, index: number) => {
											return (
												<img
													src={image}
													onClick={() => setIndexImg(index)}
													key={index}
													alt=''
													className={`w-[33%] p-2.5 hover:!border-2 hover:!border-solid hover:!border-[#ee4d2d] ${
														indexImg === index
															? '!border-2 !border-solid !border-[#ee4d2d]'
															: ''
													}`}
												/>
											)
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default memo(ProductDetailComponent)
