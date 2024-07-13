import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { formatDate } from '../../../utils/formatTimestamp'
import { useTranslation } from 'react-i18next'
import { ShopModel } from '../interfaces'

type ShopInfoProps = {
	data: ShopModel
}

function ShopInfoComponent({ data }: ShopInfoProps): JSX.Element {
	const { t } = useTranslation()
	return (
		<div className='shadow-[rgba(0,0,0,0.05)_0px_1px_1px] mt-[120px] bg-[#fff] sm-gutter  pb-[30px]  p-[25px] flex justify-between response_shop-content'>
			<div className='grid wide'>
				<div className='flex overflow-hidden'>
					<div className='relative w-[24.375rem] overflow-hidden rounded h-[8.4375rem]'>
						<div
							className='absolute bg-[50%_center] bg-cover bg-no-repeat blur-[2px] -mo-1 inset-0'
							style={{
								backgroundImage: `url(${data?.cover})`
							}}
						/>
						<div className='absolute bg-[rgba(0,0,0,0.6)] inset-0' />
						<div className='absolute inset-[0.625rem_0.875rem_0.625rem_1.25rem]'>
							<div className='flex'>
								<NavLink className='relative block h-20 w-20 shrink-0' to=''>
									<div className='block cursor-pointer select-none h-20 w-20 box-border relative border rounded-[50%] border-solid border-[rgba(0,0,0,0.09)]'>
										<div className='w-full relative bg-neutral-100 overflow-hidden pt-[100%] rounded-[50%]'>
											<svg
												enableBackground='new 0 0 15 15'
												viewBox='0 0 15 15'
												x={0}
												y={0}
												className='stroke-[#c6c6c6] absolute -translate-x-2/4 -translate-y-2/4 text-2xl font-normal leading-8 left-2/4 top-2/4'>
												<g>
													<circle
														cx='7.5'
														cy='4.5'
														fill='none'
														r='3.8'
														strokeMiterlimit={10}
													/>
													<path
														d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
														fill='none'
														strokeLinecap='round'
														strokeMiterlimit={10}
													/>
												</g>
											</svg>
										</div>
										<img
											className='absolute w-full h-full block rounded-[50%] left-0 top-0'
											src={data?.portrait}
											alt=''
										/>
									</div>
								</NavLink>
								<div className='text-[#fff] relative overflow-hidden ml-2.5 mt-2.5'>
									<h1
										className='text-xl leading-6 max-h-12 font-medium break-words overflow-hidden text-ellipsis mt-0 mb-[0.3125rem]'
										style={{
											display: '-webkit-box',
											WebkitBoxOrient: 'vertical',
											WebkitLineClamp: 2,
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>
										{data?.name}
									</h1>
									<div className='text-[0.75rem]'>
										<div className='align-middle text-xs text-[rgba(255,255,255,0.698)] mt-[0.3125rem] mb-1.5 mx-0'>
											{t(`SHOP.LABEL.ONLINE`)}
										</div>
									</div>
								</div>
							</div>
							<div className='relative flex mt-[0.625rem]'>
								<NavLink to='/' className='flex-1 pr-2.5'>
									<button className='w-full flex items-center justify-center h-[1.5625rem] border text-[#fff] uppercase text-xs font-medium box-border transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] tracking-[0] px-0 py-[0.3125rem] rounded-sm border-[solid];'>
										<span className='flex items-center justify-center text-[0.9375rem] pr-[0.625rem]'>
											<svg
												enableBackground='new 0 0 10 10'
												viewBox='0 0 10 10'
												x={0}
												y={0}
												className='inline-block w-[1em] h-[1em] fill-current relative icon-plus-sign'>
												<polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
											</svg>
										</span>
										{t(`SHOP.LABEL.FOLLOWS`)}
									</button>
								</NavLink>
								<NavLink to='/' className='flex-1 pr-2.5'>
									<button className='w-full flex items-center justify-center h-[1.5625rem] border text-[#fff] uppercase text-xs font-medium box-border transition-[background-color] duration-[0.1s] ease-[cubic-bezier(0.4,0,0.6,1)] tracking-[0] px-0 py-[0.3125rem] rounded-sm border-[solid];'>
										<span className='flex items-center justify-center text-[0.9375rem] pr-[0.625rem]'>
											<svg
												viewBox='0 0 16 16'
												className='inline-block w-[1em] h-[1em] fill-current relative'>
												<g fillRule='evenodd'>
													<path d='M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z' />
												</g>
											</svg>
										</span>
										{t(`SHOP.LABEL.CHAT`)}
									</button>
								</NavLink>
							</div>
						</div>
					</div>
					<div className='flex-1 flex flex-wrap bg-[#fff] items-start pl-[1.875rem]'>
						<div className='flex-[0_0_50%] overflow-hidden items-center flex px-0 py-[0.625rem]'>
							<div className='inline-block box-border text-[0.9375rem] mx-2.5'>
								<svg
									enableBackground='new 0 0 15 15'
									viewBox='0 0 15 15'
									x={0}
									y={0}
									strokeWidth={0}
									className='inline-block w-[1em] h-[1em] fill-current relative shrink-0 mr-[5px]'>
									<path d='m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z' />
								</svg>
							</div>
							<div className='inline-block capitalize'>
								<div className='inline-block'>{t(`SHOP.LABEL.PRODUCTS`)} </div>
								<div className='text-[#ee4d2d] inline-block'>{data?.item_count}</div>
							</div>
						</div>
						<div className='flex-[0_0_50%] overflow-hidden items-center flex px-0 py-[0.625rem]'>
							<div className='inline-block box-border text-[0.9375rem] mx-2.5'>
								<svg
									stroke='black'
									enableBackground='new 0 0 15 15'
									viewBox='0 0 15 15'
									x={0}
									y={0}
									className='inline-block w-[1em] h-[1em] fill-current relative'>
									<g>
										<circle cx='5.5' cy={5} fill='none' r={4} strokeMiterlimit={10} />
										<path
											d='m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6'
											fill='none'
											strokeLinejoin='round'
											strokeMiterlimit={10}
										/>
										<path
											d='m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2'
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeMiterlimit={10}
										/>
										<path
											d='m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2'
											fill='none'
											strokeLinecap='round'
											strokeMiterlimit={10}
										/>
									</g>
								</svg>
							</div>
							<div className='inline-block capitalize'>
								<div className='inline-block'>{t(`SHOP.LABEL.FOLLOWERS`)} </div>
								<div className='text-[#ee4d2d] inline-block'>{data?.follower_count}</div>
							</div>
						</div>
						<div className='flex-[0_0_50%] overflow-hidden items-center flex px-0 py-[0.625rem]'>
							<div className='inline-block box-border text-[0.9375rem] mx-2.5'>
								<svg
									stroke='black'
									enableBackground='new 0 0 15 15'
									viewBox='0 0 15 15'
									x={0}
									y={0}
									className='inline-block w-[1em] h-[1em] fill-current relative icon-rating'>
									<polygon
										fill='none'
										points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit={10}
									/>
								</svg>
							</div>
							<div className='inline-block capitalize'>
								<div className='inline-block'>{t(`SHOP.LABEL.EVALUATE`)} </div>
								<div className='text-[#ee4d2d] inline-block'>
									{data?.rating_bad + data?.rating_good + data?.rating_normal}
								</div>
							</div>
						</div>
						<div className='flex-[0_0_50%] overflow-hidden items-center flex px-0 py-[0.625rem]'>
							<div className='inline-block box-border text-[0.9375rem] mx-2.5'>
								<svg
									stroke='black'
									enableBackground='new 0 0 15 15'
									viewBox='0 0 15 15'
									x={0}
									y={0}
									className='inline-block w-[1em] h-[1em] fill-current relative'>
									<g>
										<polygon
											fill='none'
											points='14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2'
											strokeLinejoin='round'
											strokeMiterlimit={10}
										/>
										<circle cx={4} cy='5.8' r={1} stroke='none' />
										<circle cx='7.5' cy='5.8' r={1} stroke='none' />
										<circle cx={11} cy='5.8' r={1} stroke='none' />
									</g>
								</svg>
							</div>
							<div className='inline-block capitalize'>
								<div className='inline-block'>{t(`SHOP.LABEL.CHAT_RESPONSE_RATE`)} </div>
								<div className='text-[#ee4d2d] inline-block'>{data?.response_rate}%</div>
							</div>
						</div>
						<div className='flex-[0_0_50%] overflow-hidden items-center flex px-0 py-[0.625rem]'>
							<div className='inline-block box-border text-[0.9375rem] mx-2.5'>
								<svg
									stroke='black'
									enableBackground='new 0 0 15 15'
									viewBox='0 0 15 15'
									x={0}
									y={0}
									className='inline-block w-[1em] h-[1em] fill-current relative'>
									<g>
										<circle cx='6.8' cy='4.2' fill='none' r='3.8' strokeMiterlimit={10} />
										<polyline
											fill='none'
											points='9.2 12.5 11.2 14.5 14.2 11'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeMiterlimit={10}
										/>
										<path
											d='m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6'
											fill='none'
											strokeLinecap='round'
											strokeMiterlimit={10}
										/>
									</g>
								</svg>
							</div>
							<div className='inline-block capitalize'>
								<div className='inline-block'>{t(`SHOP.LABEL.JOIN`)} </div>
								<div className='text-[#ee4d2d] inline-block'>{formatDate(data?.createdAt)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(ShopInfoComponent)
