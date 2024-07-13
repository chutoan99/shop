import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductDetailModel } from '../interfaces'

type ProductBreadcrumbProps = {
	data: ProductDetailModel
}

function ProductBreadcrumbComponent({ data }: ProductBreadcrumbProps): JSX.Element {
	return (
		<div className=' grid wide'>
			<div className='h-[1rem] mb-[1.5rem]'>
				<NavLink className='no-underline text-[0.8125rem] text-[#05a]' to='/'>
					Shopee
				</NavLink>
				<svg
					enableBackground='new 0 0 11 11'
					viewBox='0 0 11 11'
					x={0}
					y={0}
					className=' inline-block w-[1em] h-[1em] fill-current relative text-[0.625rem] mx-[5px] my-0'>
					<path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
				</svg>

				<NavLink
					className='no-underline text-[0.8125rem] text-[#05a]'
					to={`/categories/${data.category?.category_name}/${data.category?.id}`}>
					{data?.category?.category_name}
				</NavLink>
				<svg
					enableBackground='new 0 0 11 11'
					viewBox='0 0 11 11'
					x={0}
					y={0}
					className=' inline-block w-[1em] h-[1em] fill-current relative text-[0.625rem] mx-[5px] my-0'>
					<path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
				</svg>
				<span className='whitespace-nowrap text-ellipsis overflow-hidden'>{data?.name}</span>
			</div>
		</div>
	)
}
export default memo(ProductBreadcrumbComponent)
