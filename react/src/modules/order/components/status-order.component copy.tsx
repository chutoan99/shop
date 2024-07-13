import { MouseEventHandler, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '../../../utils/formatTimestamp'
import { OrderModel } from '../interfaces'

type StatusOrderProps = {
	data: OrderModel
	onShow: MouseEventHandler<HTMLButtonElement>
}

function StatusOrderComponent({ data, onShow }: StatusOrderProps): JSX.Element {
	return (
		<>
			<div className='text-sm leading-4 flex justify-between items-center px-6 py-3'>
				<div className='flex text-[rgba(0,0,0,0.54)] mr-4'>
					<svg
						enableBackground='new 0 0 11 11'
						viewBox='0 0 11 11'
						x={0}
						y={0}
						className='inline-block w-[1em] h-[1em] fill-current relative icon-arrow-left'>
						<g>
							<path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
						</g>
					</svg>
					<NavLink to='/user/purchase'>TRỞ LẠI</NavLink>
				</div>
				<div className='flex text-right'>
					<span>MÃ ĐƠN HÀNG. {data?.id}</span>
					<span className='mx-2 my-0'>|</span>
					<span className='text-[#ee4d2d] uppercase'>{data?.state}</span>
				</div>
			</div>
			<div className='px-6 py-10'>
				<div className='relative justify-between box-border flex-nowrap flex'>
					<div
						className='w-[140px] text-center select-none cursor-default z-[1]'
						style={{
							WebkitUserSelect: 'none',
							MozUserSelect: 'none'
						}}>
						<div
							className='box-border flex flex-col justify-center items-center relative w-[60px] h-[60px] text-3xl m-auto rounded-[50%] border-4 border-solid border-[#e0e0e0] !bg-[#2dc258] !text-[#fff] !fill-[#2dc258] !border-[#2dc258]'
							style={{
								transition:
									'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
							}}>
							<svg
								enableBackground='new 0 0 32 32'
								viewBox='0 0 32 32'
								x={0}
								y={0}
								className='inline-block w-[1em] h-[1em] fill-current relative stroke-current'>
								<g>
									<path
										d='m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<g>
										<line
											fill='none'
											strokeLinecap='round'
											strokeMiterlimit={10}
											strokeWidth={3}
											x1={10}
											x2={22}
											y1='11.5'
											y2='11.5'
										/>
										<line
											fill='none'
											strokeLinecap='round'
											strokeMiterlimit={10}
											strokeWidth={3}
											x1={10}
											x2={22}
											y1='18.5'
											y2='18.5'
										/>
									</g>
								</g>
							</svg>
						</div>
						<div className='capitalize text-sm text-[rgba(0,0,0,0.8)] leading-5 mt-[1.25rem] mb-[0.25rem] mx-0'>
							Đơn hàng đã đặt
						</div>
						<div className='text-[0.75rem] text-[rgba(0,0,0,0.26)] h-[0.875rem]'>
							{formatDate(data?.createdAt as string)}
						</div>
					</div>
					<div
						className='w-[140px] text-center select-none cursor-default z-[1]'
						style={{
							WebkitUserSelect: 'none',
							MozUserSelect: 'none'
						}}>
						<div
							className='bg-[#fff] box-border flex flex-col justify-center items-center relative w-[60px] h-[60px] text-3xl m-auto rounded-[50%] border-4 border-solid border-[#e0e0e0] !text-[#2dc258] !border-[#2dc258]'
							style={{
								transition:
									'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
							}}>
							<svg
								enableBackground='new 0 0 32 32'
								viewBox='0 0 32 32'
								x={0}
								y={0}
								className='inline-block w-[1em] h-[1em] fill-current relative stroke-current'>
								<g>
									<path
										clipRule='evenodd'
										d='m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z'
										fill='none'
										fillRule='evenodd'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<path
										clipRule='evenodd'
										d='m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4'
										fill='none'
										fillRule='evenodd'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<path
										d='m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z'
										stroke='none'
									/>
								</g>
							</svg>
						</div>
						<div className='capitalize text-sm text-[rgba(0,0,0,0.8)] leading-5 mt-[1.25rem] mb-[0.25rem] mx-0'>
							Đơn hàng đã thanh toán
						</div>
					</div>
					<div
						className='w-[140px] text-center select-none cursor-default z-[1]'
						style={{
							WebkitUserSelect: 'none',
							MozUserSelect: 'none'
						}}>
						<div
							className='bg-[#fff] box-border flex flex-col justify-center items-center relative w-[60px] h-[60px] text-3xl m-auto rounded-[50%] border-4 border-solid border-[#e0e0e0] !text-[#2dc258] !border-[#2dc258]'
							style={{
								transition:
									'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
							}}>
							<svg
								enableBackground='new 0 0 32 32'
								viewBox='0 0 32 32'
								x={0}
								y={0}
								className='inline-block w-[1em] h-[1em] fill-current relative stroke-current'>
								<g>
									<line
										fill='none'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
										x1='18.1'
										x2='9.6'
										y1='20.5'
										y2='20.5'
									/>
									<circle
										cx='7.5'
										cy='23.5'
										fill='none'
										r={4}
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<circle
										cx='20.5'
										cy='23.5'
										fill='none'
										r={4}
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<line
										fill='none'
										strokeMiterlimit={10}
										strokeWidth={3}
										x1='19.7'
										x2={30}
										y1='15.5'
										y2='15.5'
									/>
									<polyline
										fill='none'
										points='4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<polyline
										fill='none'
										points='20.5 9 29.5 9 30.5 22 24.7 22'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
								</g>
							</svg>
						</div>
						<div className='capitalize text-sm text-[rgba(0,0,0,0.8)] leading-5 mt-[1.25rem] mb-[0.25rem] mx-0'>
							Đã giao cho ĐVVC
						</div>
						{/* <div className="text-[0.75rem] text-[rgba(0,0,0,0.26)] h-[0.875rem]">15:27 15-07-2023</div> */}
					</div>
					<div
						className='w-[140px] text-center select-none cursor-default z-[1]'
						style={{
							WebkitUserSelect: 'none',
							MozUserSelect: 'none'
						}}>
						<div
							className='bg-[#fff] box-border flex flex-col justify-center items-center relative w-[60px] h-[60px] text-3xl m-auto rounded-[50%] border-4 border-solid border-[#e0e0e0] !text-[#2dc258] !border-[#2dc258]'
							style={{
								transition:
									'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
							}}>
							<svg
								enableBackground='new 0 0 32 32'
								viewBox='0 0 32 32'
								x={0}
								y={0}
								className='inline-block w-[1em] h-[1em] fill-current relative stroke-current'>
								<g>
									<polygon
										fill='none'
										points='2 28 2 19.2 10.6 19.2 11.7 21.5 19.8 21.5 20.9 19.2 30 19.1 30 28'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<polyline
										fill='none'
										points='21 8 27 8 30 19.1'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<polyline
										fill='none'
										points='2 19.2 5 8 11 8'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
									/>
									<line
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit={10}
										strokeWidth={3}
										x1={16}
										x2={16}
										y1={4}
										y2={14}
									/>
									<path
										d='m20.1 13.4-3.6 3.6c-.3.3-.7.3-.9 0l-3.6-3.6c-.4-.4-.1-1.1.5-1.1h7.2c.5 0 .8.7.4 1.1z'
										stroke='none'
									/>
								</g>
							</svg>
						</div>
						<div className='capitalize text-sm text-[rgba(0,0,0,0.8)] leading-5 mt-[1.25rem] mb-[0.25rem] mx-0'>
							Đã nhận được hàng
						</div>
						{/* <div className="text-[0.75rem] text-[rgba(0,0,0,0.26)] h-[0.875rem]">07:36 20-07-2023</div> */}
					</div>
					<div
						className='w-[140px] text-center select-none cursor-default z-[1] text-[#2dc258] border-[#2dc258]'
						style={{
							WebkitUserSelect: 'none',
							MozUserSelect: 'none'
						}}>
						<div
							className='bg-[#fff] box-border flex flex-col justify-center items-center relative w-[60px] h-[60px] text-3xl m-auto rounded-[50%] border-4 border-solid border-[#e0e0e0] !text-[#2dc258] !border-[#2dc258]'
							style={{
								transition:
									'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
							}}>
							<svg
								enableBackground='new 0 0 32 32'
								viewBox='0 0 32 32'
								x={0}
								y={0}
								className='inline-block w-[1em] h-[1em] fill-current relative stroke-current'>
								<polygon
									fill='none'
									points='16 3.2 20.2 11.9 29.5 13 22.2 19 24.3 28.8 16 23.8 7.7 28.8 9.8 19 2.5 13 11.8 11.9'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeMiterlimit={10}
									strokeWidth={3}
								/>
							</svg>
						</div>
						<div className='capitalize text-sm text-[rgba(0,0,0,0.8)] leading-5 mt-[1.25rem] mb-[0.25rem] mx-0'>
							đánh giá
						</div>
						<div className='text-[0.75rem] text-[rgba(0,0,0,0.26)] h-[0.875rem]' />
					</div>
					<div className='absolute h-1 w-full top-[29px]'>
						<div
							className='absolute w-[calc(100%_-_140px)] h-full box-border mx-[70px] my-0'
							style={{ background: 'rgb(224, 224, 224)' }}
						/>
						<div
							className='transition-[width] duration-[1s] ease-in-out absolute h-full box-border mx-[70px] my-0'
							style={{
								width: 'calc((100% - 140px) * 1)',
								background: 'rgb(45, 194, 88)'
							}}
						/>
					</div>
				</div>
			</div>
			<div>
				<div className='flex flex-nowrap items-center justify-between box-border bg-[#fffcf5] px-6 py-3 border-t-[rgba(0,0,0,0.09)] border-t border-dotted'>
					<div
						className='text-left text-[rgba(0,0,0,0.54)] text-xs leading-4 pl-0 pr-3 py-0;'
						style={{ wordWrap: 'break-word' }}>
						Đánh giá sản phẩm để nhận 200 Shopee xu!
					</div>

					<div className='text-right shrink-0'>
						<button
							onClick={onShow}
							className='font-normal text-sm border bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f] min-w-[150px] min-h-[40px] capitalize px-5 py-2 rounded-[5px] w-[220px] overflow-hidden text-ellipsis'>
							Đánh giá
						</button>
					</div>
				</div>
			</div>
			<div>
				<div className='flex flex-nowrap items-center justify-between box-border bg-[#fffcf5] px-6 py-3 border-t-[rgba(0,0,0,0.09)] border-t border-dotted'>
					<div
						className='text-left text-[rgba(0,0,0,0.54)] text-xs leading-4 pl-0 pr-3 py-0;'
						style={{ wordWrap: 'break-word' }}
					/>
					<div className='text-right shrink-0'>
						<button className='font-normal  text-sm  border bg-[#fff] text-[rgba(0,0,0,0.87)] border-solid border-[rgba(0,0,0,0.26)] stardust-button--secondary min-w-[150px] min-h-[40px]  capitalize px-5 py-2 rounded-[5px] w-[220px] overflow-hidden text-ellipsis hover:!bg-[rgba(0,0,0,0.02)] hover:!border hover:!border-solid hover:!border-[rgba(0,0,0,0.09)]'>
							Liên hệ Người bán
						</button>
					</div>
				</div>
				<div className='flex flex-nowrap items-center justify-between box-border bg-[#fffcf5] px-6 py-3 border-t-[rgba(0,0,0,0.09)] border-t border-dotted'>
					<div
						className='text-left text-[rgba(0,0,0,0.54)] text-xs leading-4 pl-0 pr-3 py-0;'
						style={{ wordWrap: 'break-word' }}
					/>
					<div className='text-right shrink-0'>
						<button className='font-normal text-sm  border bg-[#fff] text-[rgba(0,0,0,0.87)] border-solid border-[rgba(0,0,0,0.26)] stardust-button--secondary min-w-[150px] min-h-[40px] capitalize px-5 py-2 rounded-[5px] w-[220px] overflow-hidden text-ellipsis hover:!bg-[rgba(0,0,0,0.02)] hover:!border hover:!border-solid hover:!border-[rgba(0,0,0,0.09)]'>
							<NavLink to={`/shop/${data?.shopid}`}>Mua lại</NavLink>
						</button>
					</div>
				</div>
			</div>
			<div className='pt-5 pb-6 px-6'>
				<div className='flex justify-between items-end pt-0 pb-3 px-0'>
					<div className='capitalize text-[rgba(0,0,0,0.8)] text-xl leading-6'>Địa chỉ nhận hàng</div>
					<div className='flex items-start leading-[14px] max-w-[50%]'>
						<div className='text-right text-xs text-[rgba(0,0,0,0.54)]' style={{ wordWrap: 'break-word' }}>
							<div>
								<div>Shopee Xpress</div>
								<div>SPXVN039481973747</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex'>
					<div className='max-w-full leading-[22px] flex-1 pl-0 pr-6 pt-2.5 pb-0'>
						<div className='max-w-full overflow-hidden text-ellipsis text-[rgba(0,0,0,0.8)] mt-0 mb-[7px] mx-0'>
							{data?.user?.name}
						</div>
						<div className='text-[rgba(0,0,0,0.54)] text-xs whitespace-pre-line'>
							<span>(+84) {data?.user?.phone}</span>
							<br />
							{data?.user?.address}
						</div>
					</div>
					<div className='w-[620px] pl-3 pr-0 pt-1 pb-0 border-l-[rgba(0,0,0,0.09)] border-l border-solid'>
						<div>
							<div className='relative flex items-start gap-3 p-0 cuJgPF'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<img
											className='relative h-6 w-6 z-[2]'
											title='image'
											src='https://cf.shopee.vn/file/delivered_parcel_active_3x'
										/>
									</div>

									<div className='m-w-0'>
										<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
											10:39 16-07-2023
										</div>
									</div>
									<div className='leading-5 mt-px mb-2 mx-0'>
										<p className='font-bold leading-5 -mb-0.5 text-[#26aa99]'>Đã giao</p>
										<p className='text-[#26aa99]'>
											Đơn hàng đã được giao thành công
											<span>. Người nhận hàng: Truong Van Chu Toan--</span>.{' '}
											<span className='whitespace-nowrap text-[#05a] cursor-pointer' tabIndex={0}>
												Xem hình ảnh giao hàng
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<img
											className='relative h-6 w-6 z-[2]'
											title='image'
											src='https://cf.shopee.vn/file/domestic_transit_3x'
										/>
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										09:42 16-07-2023
									</div>
									<div className='min-w-0'>
										<p className='font-bold leading-5 -mb-0.5'>Đang vận chuyển</p>
										<p className='className="leading-5 mt-px mb-2 mx-0"'>
											Đơn hàng đang trên đường giao đến bạn
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<div className='w-[11px] h-[11px] shrink-0 z-[1] ml-0.5 rounded-[50%] bg-[#d8d8d8]' />
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										05:46 16-07-2023
									</div>
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5' />
										<p className='className="leading-5 mt-px mb-2 mx-0"'>
											Đơn hàng đã đến bưu cục 50-HCM Binh Chanh/Phong Phu LM Hub
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<div className='w-[11px] h-[11px] shrink-0 z-[1] ml-0.5 rounded-[50%] bg-[#d8d8d8]' />
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										03:26 16-07-2023
									</div>
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5' />
										<p className='className="leading-5 mt-px mb-2 mx-0"'>
											Đơn hàng đang được trung chuyển tới 50-HCM Binh Chanh/Phong Phu LM Hub
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<div className='w-[11px] h-[11px] shrink-0 z-[1] ml-0.5 rounded-[50%] bg-[#d8d8d8]' />
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										00:56 16-07-2023
									</div>
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5' />
										<p className='leading-5 mt-px mb-2 mx-0'>
											Đơn hàng đã đến kho phân loại BW SOC
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<div className='w-[11px] h-[11px] shrink-0 z-[1] ml-0.5 rounded-[50%] bg-[#d8d8d8]' />
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										21:00 15-07-2023
									</div>
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5' />
										<p className='leading-5 mt-px mb-2 mx-0'>
											Đơn hàng đang được trung chuyển tới BW SOC
										</p>
									</div>
								</div>
							</div>
							<div className='relative flex items-start gap-3 p-0 cuJgPF'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8]  last:hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<img
											className='relative h-6 w-6 z-[2]'
											title='image'
											src='https://cf.shopee.vn/file/preparing_to_ship_3x'
										/>
									</div>
									<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
										08:43 07-07-2023
									</div>
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5 text-[#26aa99]'>Đang chuẩn bị</p>
										<p className='leading-5 mt-px mb-2 mx-0 text-[#26aa99]'>
											Người bán đang chuẩn bị hàng
										</p>
									</div>
								</div>
							</div>

							<div className='relative flex items-start gap-3 p-0'>
								<div className='w-px h-full absolute left-3 top-3 bg-[#d8d8d8] hidden' />
								<div className='flex items-start justify-start flex-nowrap w-full text-[rgba(0,0,0,0.54)] text-sm'>
									<div className='flex items-center justify-center h-6 w-6 min-w-[24px]'>
										<img
											className='relative h-6 w-6 z-[2]'
											title='image'
											src='https://cf.shopee.vn/file/order_placed_3x'
											alt=''
										/>
									</div>
									{data?.createdAt && (
										<div className='w-[155px] shrink-0 text-[rgba(0,0,0,0.8)] mt-[3px] px-3 py-0'>
											{formatDate(data?.createdAt)}
										</div>
									)}
									<div className='m-w-0'>
										<p className='font-bold leading-5 -mb-0.5'>Đơn đã đặt</p>
										<p className='leading-5 mt-px mb-2 mx-0'>Đơn hàng đã được đặt</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default memo(StatusOrderComponent)
