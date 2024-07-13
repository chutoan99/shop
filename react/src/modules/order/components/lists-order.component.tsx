import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { formatPrice } from '../../../utils/formatPrice'
import { OrderModel } from '../interfaces'
import { PostBaseModel } from '../../post/interfaces'

type ListsOrderProps = {
	data: OrderModel
}

function ListsOrderComponent({ data }: ListsOrderProps): JSX.Element {
	return (
		<div className='bg-neutral-50 px-6 py-3'>
			<div className='flex items-center justify-between pt-0 pb-3 px-0'>
				<div className='flex items-center whitespace-nowrap'>
					<div className='flex items-center'>
						<svg className='mr-[5px]' xmlns='http://www.w3.org/2000/svg' width={70} height={16} fill='none'>
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
								<path fill='#fff' d='M63 8.2h2.2v1.6H63V12h-1.6V9.8h-2.2V8.2h2.2V6H63v2.3z' />
							</g>
							<defs>
								<clipPath id='clip0'>
									<path fill='#fff' d='M0 0h55v16H0z' transform='translate(4)' />
								</clipPath>
								<clipPath id='clip1'>
									<path fill='#fff' d='M0 0h7v16H0z' transform='translate(59)' />
								</clipPath>
							</defs>
						</svg>
					</div>
					<div className='max-w-[200px] text-sm font-semibold overflow-hidden text-ellipsis ml-2 mr-0 my-0'>
						{data?.shop_name}
					</div>
					<div className='ml-2 mr-0 my-0'>
						<button className='text-xs capitalize border bg-[#ee4d2d] text-[#fff] px-2 py-1 rounded-sm border-solid border-transparent  flex items-center hover:bg-[#d73211] hover:border-[#ba2b0f]'>
							<svg
								viewBox='0 0 17 17'
								className='mr-[5px] inline-block w-[1em] h-[1em] fill-current relative'
								style={{ fill: 'white' }}>
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
					<NavLink className='ml-2 mr-0 my-0' to={`/shop/${data?.shopid}`}>
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
				<div className='flex items-center pl-2.5 pr-0 py-0'>
					<svg width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							clipRule='evenodd'
							d='M8 15A7 7 0 108 1a7 7 0 000 14z'
							stroke='#000'
							strokeOpacity='.54'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M8 6a1 1 0 100-2 1 1 0 000 2zM7.25 7.932v3.636c0 .377.336.682.75.682s.75-.305.75-.682V7.932c0-.377-.336-.682-.75-.682s-.75.305-.75.682z'
							fill='#000'
							fillOpacity='.54'
						/>
					</svg>
				</div>
			</div>
			<hr className='border-b-[rgba(0,0,0,0.06)] border-b border-solid' />
			{data?.posts?.map((post: PostBaseModel, index: number) => (
				<NavLink key={post.id} className='mb-[10px]' to={`/product/${post?.id}/${post?.shopid}`}>
					<div className=''>
						<div>
							<span className='items-center flex-nowrap text-[rgba(0,0,0,0.87)] flex pt-3 pb-0 px-0'>
								<div />
								<div className='flex-1 items-start flex-nowrap flex pl-0 pr-3 py-0'>
									<div className=' w-[81px] h-[81px]'>
										<div className='relative'>
											<div className='w-20 h-20 mr-3'>
												<img className='w-full h-full' src={post?.image} alt={post?.name} />
											</div>
											<div
												className='bg-[50%] bg-cover bg-no-repeat absolute w-full h-full left-0 top-0'
												style={{
													backgroundImage: `${post?.image}`
												}}>
												<div className='w-full h-full'></div>
											</div>
										</div>
									</div>

									<div className='min-w-0 flex flex-1 flex-col items-start pl-3 pr-0 py-0'>
										<div>
											<div
												className='overflow-hidden text-ellipsis text-base leading-22 max-h-12 mt-0 mb-[5px] mx-0'
												style={{
													display: '-webkit-box',
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: 2
												}}>
												<span>{post?.name}</span>
											</div>
										</div>
										<div className='mt-0 mx-0'>
											<div className='text-[rgba(0,0,0,0.54)] mb-[5px]'>
												Phân loại hàng: {data?.tierVariation?.split(',')[index]},{' '}
												{data?.item_option?.split(',')[index]}
											</div>
											<div className=''>x{data?.amount?.split(',')[index]}</div>
										</div>
									</div>
								</div>
								<div>
									<div>
										<span className='align-middle text-sm leading-4 text-[rgba(0,0,0,0.87)]'>
											<div
												className='text-sm flex justify-center flex-col text-center text-[rgba(0, 0, 0, 0.87)] font-medium'
												style={{
													flexDirection: 'row',
													gap: '8px'
												}}>
												<h3>₫ {formatPrice(post?.price, +data?.amount)}</h3>
											</div>
										</span>
									</div>
								</div>
							</span>
						</div>
						<div className='h-2.5 border-b-[rgba(0,0,0,0.09)] border-b border-solid' />
					</div>
				</NavLink>
			))}
		</div>
	)
}
export default memo(ListsOrderComponent)
