import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function HomeFilterComponent(): JSX.Element {
	const [filterDay, setFilterDay] = useState(1)
	const [filterMonth, setFilterMonth] = useState(12)
	const handleBack = () => {
		setFilterDay(filterDay - 1)
		if (filterDay === 0) {
			setFilterMonth(filterMonth - 1)
			setFilterDay(31)
		}
		if (filterMonth === 0) {
			setFilterMonth(12)
		}
	}
	const handleNext = () => {
		setFilterDay(filterDay + 1)
		if (filterDay > 30) {
			setFilterDay(1)
			setFilterMonth(filterMonth + 1)
		}
		if (filterMonth > 12) {
			setFilterMonth(1)
		}
	}
	return (
		<div className='mt-[20px] mb-[10px] flex items-center gap-[10px]'>
			<div className='flex items-center gap-[10px]'>
				<span className='text-[0.875rem] text-[#555] font-normal mr-[12px]'>Sắp xếp theo</span>
				<button
					type='button'
					className='h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline cursor-pointer overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] flex items-center justify-center capitalize bg-[#ee4d2d] text-[#fff] px-3 py-0 rounded-sm border-[none] border-0'>
					Phổ biến
				</button>
				<button
					type='button'
					className='h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline cursor-pointer overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] flex items-center justify-center capitalize px-3 py-0 rounded-sm border-[none] border-0 bg-[#fff]'>
					Mới nhất
				</button>
				<button
					type='button'
					className='h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline cursor-pointer overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] flex items-center justify-center capitalize px-3 py-0 rounded-sm border-[none] border-0 bg-[#fff]'>
					Bán chạy
				</button>
			</div>
			<div className='group flex justify-between items-center min-w-[200px] h-[34px] leading-[2.125rem] bg-[#fff] relative cursor-pointer z-[1] px-3 py-0'>
				<span className='flex items-center text-sm'>Giá</span>
				<span className='text-sm text-[#838383] relative top-px'>
					<i className='fa-solid fa-angle-down'></i>
				</span>
				<ul
					className='group-hover:block cursor-pointer absolute bg-[#fff] hidden shadow-[0_1px_2px_rgba(0,0,0,0.1)] px-4 py-2 rounded-sm top-[25px] inset-x-0'
					style={{ listStyle: 'none' }}>
					<li>
						<NavLink to='# ' className='flex justify-start no-underline text-sm text-[#333] px-0 py-2'>
							Giá thấp đến cao
						</NavLink>
					</li>
					<li>
						<NavLink to='# ' className='flex justify-start no-underline text-sm text-[#333] px-0 py-2'>
							Giá cao đến thấp
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='flex items-center ml-auto'>
				<span className='text-sm text-[#333] mr-[22px]'>
					<span className='text-[#ee4d2d] text-[0.938rem]'>Ngày {filterDay}</span> / Tháng {filterMonth}
				</span>
			</div>

			<div className='overflow-hidden flex w-[72px] h-9 rounded-sm'>
				<span
					onClick={handleBack}
					className='bg-[#f9f9f9] text-sm text-[#555] flex-1 flex w-9 h-9 no-underline items-center justify-center m-auto border-r-[#eee] border-r border-solid'>
					<i className='fa-solid fa-angle-left'></i>
				</span>
				<span
					onClick={handleNext}
					className='text-sm text-[#555] flex-1 flex w-9 h-9 bg-[#fff] no-underline items-center justify-center m-auto'>
					<i className='fa-solid fa-angle-right'></i>
				</span>
			</div>
		</div>
	)
}
export default HomeFilterComponent
