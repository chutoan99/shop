import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '../../../../utils/formatPrice'
import { CartModel } from '../../../cart/interfaces'

type HeaderCartProps = {
	totalCart: number
	data: CartModel[][]
	loading: boolean
}

export default function HeaderCartComponent({ data, totalCart, loading }: HeaderCartProps): JSX.Element {
	const { t } = useTranslation()
	return (
		<NavLink to='/cart' className='justify-center flex cursor-pointer items-center flex-1 group'>
			<div className='relative inline-block px-2 py-0'>
				<span className='text-[#fff] text-2xl mt-1.5'>
					<i className='fa-solid fa-cart-shopping'></i>
				</span>
				{totalCart !== 0 && (
					<span className='text-sm absolute leading-[0.875rem] text-[#ee4d2d] bg-[#fff] px-[7px] py-px rounded-[10px] border-2 border-solid border-[#ee4d2d] -right-1 -top-1'>
						{totalCart}
					</span>
				)}
				<div
					style={{ border: 'solid 1px rgb(0, 0, 0, 0.1)' }}
					className="group-hover:block w-[380px] absolute bg-[#fff] hidden cursor-default will-change-[opacity_transform] origin-[(100%-32px)_top] animate-[HeaderNOtifyGrowth_ease-in_0.25s] z-10 rounded-sm  right-[-15px] top-[150%] before:content-[''] before:z-10 before:absolute before:top-[-30px] before:border-solid before:!border-x-[25px] before:!border-y-[15px] before:border-[transparent_transparent_#fff_transparent] before:right-[8px] after:content-[''] after:z-10 after:block after:absolute after:w-[118px] after:h-[31px] after:right-0 after:-top-4">
					{totalCart > 0 ? (
						<>
							<header className='h-[40px] bg-[#fff]'>
								<h3 className='text-[#999] font-normal text-sm leading-10 ml-3 mr-0 my-0'>
									{t`HEADER.CART.LABEL.PRODUCTS_ADDED`}
								</h3>
							</header>
							{!loading && (
								<ul className='pl-0'>
									{data?.map((item: CartModel[], index: number) => {
										return (
											<div key={index}>
												{item.map((ele: CartModel, index: number) => (
													<li className='flex' key={index}>
														<img
															className='w-[42px] h-[42px] border m-3 border-solid border-[#e8e8e8]'
															src={ele?.overview?.image}
															alt={ele?.overview?.name}
														/>
														<div className='w-full mr-3 mt-3'>
															<div className='flex items-center justify-between gap-[20px]'>
																<h5
																	className='text-[0.813rem] font-normal text-[#333] overflow-hidden text-ellipsis mr-2.5 m-0'
																	style={{
																		display: '-webkit-box',
																		WebkitLineClamp: 2,
																		WebkitBoxOrient: 'vertical'
																	}}>
																	{ele?.overview?.name}
																</h5>
																<div>
																	<span className='text-sm text-[#ee4d2d] font-normal'>
																		đ{formatPrice(ele?.overview?.price)}
																	</span>
																</div>
															</div>
														</div>
													</li>
												))}
											</div>
										)
									})}
								</ul>
							)}
							<footer className='text-[black] text-[0.938rem] text-center w-full px-2 py-2 flex items-center justify-between'>
								<h5
									className='text-[0.9rem] font-normal text-[#333] overflow-hidden text-ellipsis mr-2.5 m-0'
									style={{
										display: '-webkit-box',
										WebkitLineClamp: 1,
										WebkitBoxOrient: 'vertical'
									}}>
									{t('HEADER.CART.LABEL.SEE_MORE', { totalCart })}
								</h5>
								<NavLink
									to='/cart'
									className='min-h-[40px]  h-[30px] min-w-[120px] overflow-hidden text-ellipsis border capitalize  font-normal text-sm  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
									{t`HEADER.CART.LABEL.VIEW_CART`}
								</NavLink>
							</footer>
						</>
					) : (
						<div className='py-[20px] px-[10px]'>
							<img
								src='/assets/Img/no-cart.png'
								alt='noCart'
								className='flex justify-center max-w-full h-auto w-[54%] mx-auto border-none'
							/>
							<p className='flex justify-center text-xl text-[#333] my-3.5 mx-auto'>
								{t`HEADER.CART.LABEL.NO_PRODUCT`}
							</p>
						</div>
					)}
				</div>
			</div>
		</NavLink>
	)
}
