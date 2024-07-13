import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import { formatPrice } from '../../../utils/formatPrice'
import { useAppDispatch } from '../../../hooks/hooks'
import { AppDispatch, OtherActions } from '../../../redux'
import { generateStart } from '../helpers'
import { PostBaseModel } from '../interfaces'

type ProductListProps = {
	items: PostBaseModel[]
	col: string
	loading: boolean
}
function ProductListComponent({ items, col, loading }: ProductListProps): JSX.Element {
	const dispatch: AppDispatch = useAppDispatch()
	const [likes, setLikes] = useState<string[]>(items.map(() => 'fa-regular fa-heart'))
	const changeLike = (index: number) => {
		setLikes((prevLikes) => {
			const newLikes = [...prevLikes]

			if (prevLikes[index] === 'fa-solid fa-heart') {
				newLikes[index] = 'fa-regular fa-heart'
				dispatch(OtherActions.updateHeartFalse())
			} else {
				newLikes[index] = 'fa-solid fa-heart'
				dispatch(OtherActions.updateHeartTrue())
				setTimeout(() => {
					dispatch(OtherActions.updateHeartFalse())
				}, 1400)
			}
			return newLikes
		})
	}

	return (
		<div className='mb-[20px]'>
			<div className='row sm-gutter'>
				{items?.map((item: PostBaseModel, index: number) => (
					<div className={col} key={index}>
						<div
							className='box-border bg-[#fff] relative shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-[linear] delay-[0.1s] no-underline block cursor-pointer mt-[5px] pb-[5px] rounded-sm group hover:shadow-[0_1px_20px_rgba(0,0,0,0.05)] hover:-translate-y-px hover:border hover:z-[2] hover:border-solid hover:border-[#ee4d2d]'
							key={item.id}>
							{item?.show_free_shipping === 1 ? (
								<img
									src='/assets/Img/sale_sticker.png'
									className='absolute'
									style={{ zIndex: '9' }}
									alt='sale'
								/>
							) : null}
							<LazyLoadImage
								effect='blur'
								src={item.image}
								alt='itemProduct'
								className='w-full h-[190px] cursor-pointer bg-[top_center] bg-contain bg-no-repeat rounded-br-sm rounded-bl-sm'
							/>
							<NavLink
								to={`/product/${item?.id}/${item?.shopid}`}
								className='text-[0.875rem] font-normal text-[#333] leading-[1.125rem] h-9 overflow-hidden ml-1.5 mr-2.5 my-2.5 hover:text-[#333]'
								style={{
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 2,
									overflow: 'hidden'
								}}>
								{item?.name}
							</NavLink>
							<div className='flex items-baseline justify-between'>
								{item?.price_before_discount !== 0 ? (
									<span className='text-[0.875rem] text-[#666] line-through ml-2.5'>
										{formatPrice(item.price_before_discount)}đ
									</span>
								) : (
									<span className='text-[0.875rem] text-[#666] line-through ml-2.5'></span>
								)}

								<span className='text-[16px] text-[#ee4d2d] mx-2.5'>{formatPrice(item?.price)}đ</span>
							</div>
							<div className='flex items-center justify-between mt-1.5 mb-0 mx-2.5'>
								<span
									className='text-[rgb(255,66,79)] text-[0.813rem]'
									onClick={() => changeLike(index)}>
									<i className={likes[index]}></i>
								</span>
								<div className='text-[0.625rem] origin-right text-[#ccc] ml-auto mr-0 -mt-px mb-0 scale-[0.8]'>
									{generateStart(item.shop_rating)}
								</div>
								<span className='text-xs text-[#333] ml-1.5'>{item?.historical_sold}đã bán</span>
							</div>
							{item?.is_official_shop ? (
								<div
									className='absolute text-[0.625rem] font-medium pr-1 rounded-tr-[3px] rounded-br-[3px] -left-1 top-2.5 text-[#fff] '
									style={{
										background: '#d0011b',
										lineHeight: '1.3rem',
										width: '35px'
									}}>
									<span className='ml-[5px]'> Mall</span>
								</div>
							) : (
								<div className="absolute text-[#fff] bg-[#ee4d2d] text-[0.625rem] font-medium leading-4 px-1 rounded-tr-[3px] rounded-br-[3px] -left-1 top-2.5 after:content-[''] after:absolute after:brightness-[60%] after:border-l-[3px] after:border-l-transparent after:border-t-[3px] after:border-t-[#ee4d2d] after:border-solid after:left-0 after:top-4">
									<span>Yêu thích</span>
								</div>
							)}
							{item.discount && (
								<div className="absolute text-[rgb(255,216,64,0.94)] bg-current text-[0.625rem] w-10 h-9 text-center right-0 top-0 before:content-[''] before:absolute before:z-0 before:border-t-[0] before:border-x-[20px] before:border-b-[4px] before:border-solid before:border-[transparent_currentColor_transparent_currentColor] before:left-0 before:-bottomo-1">
									<span className='text-[#ee4d2d] font-semibold text-xs leading-3'>
										{item.discount}
									</span>
									<br></br>
									<span className='text-[#fff] text-[0.813rem] leading-[0.813rem] font-semibold'>
										Giảm
									</span>
								</div>
							)}

							<div className='group-hover:!opacity-100 opacity-0 absolute w-full h-[30px] text-sm text-center leading-[1.875rem] bg-[#ee4d2d] text-[#fff] z-[100]  cursor-pointer'>
								Tìm sản phẩm tương tự
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
export default memo(ProductListComponent)
