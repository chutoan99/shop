import { memo } from 'react'
import ReactPaginate from 'react-paginate'

function PaginationComponent({ setPayload, totalPage }: { setPayload: any; totalPage: number }): JSX.Element {
	const handleClickPage = (e: any) => {
		setPayload((prev: any) => {
			return {
				...prev,
				page: e.selected + 1
			}
		})
	}
	return (
		<ReactPaginate
			previousLabel={
				<svg
					enableBackground='new 0 0 11 11'
					viewBox='0 0 11 11'
					x='0'
					y='0'
					className='inline-block w-[1em] h-[1em] fill-current relative  rotate-180'>
					<path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z'></path>
				</svg>
			}
			previousClassName={'text-[#939393]'}
			pageCount={totalPage}
			breakLabel={'...'}
			marginPagesDisplayed={3}
			pageRangeDisplayed={4}
			onPageChange={(e) => {
				handleClickPage(e)
			}}
			containerClassName={'flex justify-center justify-items-center gap-5 mt-12 mb-8 pl-0 items-center'}
			pageClassName={' my-0 list-none'}
			pageLinkClassName={
				'no-underline text-xl font-light text-[#939393] flex items-center justify-center bg-transparent min-w-[40px] h-[30px] text-center leading-[30px] cursor-pointer rounded-sm border-[none]'
			}
			activeClassName={'!bg-[#ee4d2d] rounded-[7px] !text-[#fff]'}
			nextClassName={'text-[#939393]'}
			nextLabel={
				<svg
					enableBackground='new 0 0 11 11'
					viewBox='0 0 11 11'
					x='0'
					y='0'
					className='inline-block w-[1em] h-[1em] fill-current relative'>
					<g>
						<path d='m2.5 0c-.1 0-.2 0-.3.1-.2.2-.2.5-.1.7l4.6 5.5-4.6 5.5c-.2.2-.2.5-.1.7s.5.2.7-.1l6-5c.1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.1-.1-.2-.1-.4-.1z'></path>
					</g>
				</svg>
			}
		/>
	)
}
export default memo(PaginationComponent)
