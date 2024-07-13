import { memo } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGetCategoryTreeParentQuery } from '../../hooks'

function FilterComponent(): JSX.Element {
	const params = useParams()
	const { data, isLoading } = useGetCategoryTreeParentQuery(Number(params.catid))

	return (
		<div className='min-w-0 ml-0 mr-5 mt-0 mb-5'>
			{params.display_name && (
				<div className='text-[rgba(0,0,0,0.8)]'>
					<NavLink
						to='/'
						className='capitalize no-underline text-[rgba(0,0,0,0.8)] h-[3.125rem] leading-[3.125rem] font-bold text-base flex items-center mb-2.5 border-b-[rgba(0,0,0,0.05)] border-b border-solid'>
						<svg
							viewBox='0 0 12 10'
							className='text-xs stroke-current inline-block w-[1em] h-[1em] fill-current relative mr-2.5 '>
							<g fillRule='evenodd' stroke='none' strokeWidth={1}>
								<g transform='translate(-373 -208)'>
									<g transform='translate(155 191)'>
										<g transform='translate(218 17)'>
											<path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
											<path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
											<path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
										</g>
									</g>
								</g>
							</g>
						</svg>
						Tất cả Danh mục
					</NavLink>
					<div>
						<div>
							<div
								className='text-[rgba(0,0,0,0.8)] items-center overflow-hidden text-ellipsis relative leading-4 max-h-12 pl-3 pr-2.5 py-2'
								style={{
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 3,
									wordWrap: 'break-word'
								}}>
								<NavLink className='text-[#ee4d2d] font-bold no-underline text-sm' to='/'>
									<svg
										viewBox='0 0 4 7'
										className='opacity-100 fill-[#ee4d2d] text-xs stroke-current inline-block mr-2.5 top-[14px] h-[7px] w-[7px] absolute left-0'>
										<polygon points='4 3.5 0 0 0 7' />
									</svg>
									{params.display_name}
								</NavLink>
							</div>
							{!isLoading && (
								<>
									{data?.response?.map((item: any, index: number) => {
										return (
											<NavLink
												className='no-underline text-[rgba(0,0,0,0.87)] block text-ellipsis relative leading-4 max-h-12 overflow-hidden text-sm font-medium pl-3 pr-2.5 py-2'
												style={{
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: 3,

													wordWrap: 'break-word'
												}}
												to='/'
												key={index}>
												{item?.display_name}
											</NavLink>
										)
									})}
								</>
							)}
						</div>
					</div>
				</div>
			)}
			<div />
			<div className='flex items-center justify-start uppercase text-[rgba(0,0,0,0.8)] h-[1.875rem] font-bold text-base'>
				<svg
					enableBackground='new 0 0 15 15'
					viewBox='0 0 15 15'
					x={0}
					y={0}
					className='text-xs stroke-current inline-block w-[1em] h-[1em] fill-current relative mr-2.5'>
					<g>
						<polyline
							fill='none'
							points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeMiterlimit={10}
						/>
					</g>
				</svg>
				<div className='flex-1'>Bộ lọc tìm kiếm</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Theo Danh Mục</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100244} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Áo thun (801k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100242} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Áo sơ mi (183k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100050} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Áo khoác (174k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100053} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quần đùi (145k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100009} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Phụ Kiện Thời Trang (144k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100243} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Áo polo (144k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100047} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quần jean (121k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100048} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Hoodie &amp; Áo nỉ (121k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100052} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quần dài (115k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100055} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Đồ lót (106k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100057} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Bộ (88k+)
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={100017} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Thời Trang Nữ (63k+)
								</span>
							</label>
						</div>
					</div>
					<div>
						<div>
							<div className='flex items-center font-medium cursor-pointer pl-5 pr-2.5 py-2'>
								Thêm
								<svg
									enableBackground='new 0 0 11 11'
									viewBox='0 0 11 11'
									x={0}
									y={0}
									className='text-[0.4375rem] inline-block w-[1em] h-[1em] fill-current relative ml-2.5'>
									<g>
										<path d='m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z' />
									</g>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Nơi Bán</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='TP. Hồ Chí Minh' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									TP. Hồ Chí Minh
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Hà Nội' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Hà Nội
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 1' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 1
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 3' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 3
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 6' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 6
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 7' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 7
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 8' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 8
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 10' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 10
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 11' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 11
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận 12' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận 12
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Gò Vấp' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Gò Vấp
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Tân Phú' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Tân Phú
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Bình Tân' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Bình Tân
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Tân Bình' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Tân Bình
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Thành Phố Thủ Đức' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Thành Phố Thủ Đức
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Bình Thạnh' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Bình Thạnh
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Quận Phú Nhuận' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Quận Phú Nhuận
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue='Huyện Bình Chánh' />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Huyện Bình Chánh
								</span>
							</label>
						</div>
					</div>
					<div className='flex items-center font-medium cursor-pointer pl-5 pr-2.5 py-2'>
						Thêm
						<svg
							enableBackground='new 0 0 11 11'
							viewBox='0 0 11 11'
							x={0}
							y={0}
							className='text-[0.4375rem] inline-block w-[1em] h-[1em] fill-current relative ml-2.5'>
							<g>
								<path d='m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z' />
							</g>
						</svg>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Đơn Vị Vận Chuyển</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Hỏa Tốc
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={2} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Nhanh
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Tiết Kiệm
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Thương Hiệu</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1277322} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									COOLMATE
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3383086} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									SENIM
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3213680} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									KARANTS
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={2241936} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									ROWAY
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3020933} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									PT Jewelry &amp; Accessories
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={2352745} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									NOCTURNAL
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3487506} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									L66 Studio
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1664281} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									City Cycle
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1063818} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									AVIANO
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1253300} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									LEVENTS
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1255588} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									GUZADO
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1258193} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									ATINO
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3682733} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									1HAND OFFICIAL
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1077247} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									TSIMPLE
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1237600} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									POLOMAN
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1250589} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Teelab
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={1544544} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									BẢO ĐĂNG
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={2006352} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									JBAGY
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={2871730} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									VESCA
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={3364901} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Newseven
								</span>
							</label>
						</div>
					</div>
					<div className='flex items-center font-medium cursor-pointer pl-5 pr-2.5 py-2'>
						Thêm
						<svg
							enableBackground='new 0 0 11 11'
							viewBox='0 0 11 11'
							x={0}
							y={0}
							className='text-[0.4375rem] inline-block w-[1em] h-[1em] fill-current relative ml-2.5'>
							<g>
								<path d='m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z' />
							</g>
						</svg>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Khoảng Giá</div>
				<div>
					<div className='flex justify-between items-center mt-[1.25rem] mb-[0.625rem] mx-0'>
						<input
							type='text'
							maxLength={13}
							className='w-20 text-xs h-[1.875rem] bg-[#fff] border box-border shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] pl-[0.3125rem] rounded-sm border-solid border-[rgba(0,0,0,0.26)] pr-[5px]'
							placeholder='₫ TỪ'
							defaultValue=''
						/>
						<div className='flex-1 h-px mx-2.5 my-0 bg-[#bdbdbd]' />
						<input
							type='text'
							maxLength={13}
							className='w-20 text-xs h-[1.875rem] bg-[#fff] border box-border shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] pl-[0.3125rem] rounded-sm border-solid border-[rgba(0,0,0,0.26)]  pr-[5px]'
							placeholder='₫ ĐẾN'
							defaultValue=''
						/>
					</div>
				</div>

				<button className='mt-[1.25rem] min-h-[30px]  h-[30px] w-full flex items-center justify-center overflow-hidden text-ellipsis border capitalize  font-normal  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
					Áp dụng
				</button>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Loại Shop</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={5} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Shopee Mall
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={7} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Shop Yêu thích
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={6} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Shop Yêu Thích +
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Tình Trạng</div>
				<div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={9} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Đã sử dụng
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={8} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Mới
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Đánh Giá</div>
				<div>
					<div className='cursor-pointer flex items-center h-[1.5625rem] whitespace-nowrap px-3 py-0'>
						<div className='flex mb-px'>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</div>
					</div>
					<div className='cursor-pointer flex items-center h-[1.5625rem] whitespace-nowrap px-3 py-0'>
						<div className='flex mb-px'>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
						</div>{' '}
						trở lên
					</div>
					<div className='cursor-pointer flex items-center h-[1.5625rem] whitespace-nowrap px-3 py-0'>
						<div className='flex mb-px'>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
						</div>{' '}
						trở lên
					</div>
					<div className='cursor-pointer flex items-center h-[1.5625rem] whitespace-nowrap px-3 py-0'>
						<div className='flex mb-px'>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
						</div>{' '}
						trở lên
					</div>
					<div className='cursor-pointer flex items-center h-[1.5625rem] whitespace-nowrap px-3 py-0'>
						<div className='flex mb-px'>
							<svg
								viewBox='0 0 9.5 8'
								className='text-[#ffce3d] inline-block w-[1em] h-[1em] fill-current relative ml-0 mr-1 my-0'>
								<defs>
									<linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
										<stop offset={0} stopColor='#ffca11' />
										<stop offset={1} stopColor='#ffad27' />
									</linearGradient>
									<polygon
										id='ratingStar'
										points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
									/>
								</defs>
								<g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
									<g transform='translate(-876 -1270)'>
										<g transform='translate(155 992)'>
											<g transform='translate(600 29)'>
												<g transform='translate(10 239)'>
													<g transform='translate(101 10)'>
														<use
															stroke='#ffa727'
															strokeWidth='.5'
															xlinkHref='#ratingStar'
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
							<div className='text-[#ffce3d] ml-0 mr-1 my-0 relative' style={{ width: 14, height: 14 }}>
								<svg viewBox='0 0 30 30' className='w-full h-full absolute left-0 top-0'>
									<defs>
										<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
											<stop offset='0%' stopColor='#FFD211' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='none'
										fillRule='evenodd'
										stroke='url(#star__hollow)'
										strokeWidth={2}
										d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
									/>
								</svg>
								<svg
									viewBox='0 0 30 30'
									className='w-full h-full absolute left-0 top-0'
									style={{ width: '0%' }}>
									<defs>
										<linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#FFCA11' />
											<stop offset='100%' stopColor='#FFAD27' />
										</linearGradient>
									</defs>
									<path
										fill='url(#star__solid)'
										fillRule='evenodd'
										d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
									/>
								</svg>
							</div>
						</div>{' '}
						trở lên
					</div>
				</div>
			</div>
			<div className='px-0 py-[1.25rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'>
				<div className=' font-medium mb-2.5'>Dịch Vụ &amp; Khuyến Mãi</div>
				<div>
					<div>
						<div style={{ height: 1 }} />
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={10} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Đang giảm giá
								</span>
							</label>
						</div>
					</div>
					<div>
						<div style={{ height: 1 }} />
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={15} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Gì Cũng Rẻ
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={12} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Hàng có sẵn
								</span>
							</label>
						</div>
					</div>
					<div className='items-start justify-start flex-wrap flex px-0 py-2'>
						<div className='block text-[rgba(0,0,0,0.8)]'>
							<label className='items-start cursor-pointer flex select-none text-[0.875rem]'>
								<input type='checkbox' className='hidden' name='' defaultValue={14} />
								<div className='justify-center box-border bg-[#fff] text-center w-[0.8125rem] h-[0.8125rem] leading-[0.6875rem] border shrink-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] flex items-center cursor-pointer select-none mr-2.5 mt-px rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
									<i> </i>
								</div>
								<span
									className='overflow-hidden text-ellipsis leading-4 max-h-12'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 3,
										wordWrap: 'break-word'
									}}>
									Mua giá bán buôn/ bán sỉ
								</span>
							</label>
						</div>
					</div>
					<div className='flex items-center font-medium cursor-pointer pl-5 pr-2.5 py-2'>
						Thêm
						<svg
							enableBackground='new 0 0 11 11'
							viewBox='0 0 11 11'
							x={0}
							y={0}
							className='text-[0.4375rem] inline-block w-[1em] h-[1em] fill-current relative ml-2.5'>
							<g>
								<path d='m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z' />
							</g>
						</svg>
					</div>
				</div>
			</div>
			<button className='mt-[1.25rem] min-h-[35px]  h-[35px] w-full flex items-center justify-center overflow-hidden text-ellipsis border capitalize  font-normal  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
				Xóa tất cả
			</button>
		</div>
	)
}
export default memo(FilterComponent)
