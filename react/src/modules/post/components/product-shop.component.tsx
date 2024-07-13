import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/hooks'
import { useCreateRoomMutation } from '../../shared/chat/hooks'
import { AppDispatch, OtherActions } from '../../../redux'
import { ShopModel } from '../../shop/interfaces'

type ProductShopProps = {
	data: ShopModel
}

function ProductShopComponent({ data }: ProductShopProps): JSX.Element {
	const navigate = useNavigate()
	const dispatch: AppDispatch = useAppDispatch()
	const [createRoom] = useCreateRoomMutation()

	const onChatWithShop = async () => {
		const payload = {
			shopid: data?.id
		}
		dispatch(OtherActions.ToggleIsChat())
		createRoom(payload).unwrap()
	}

	return (
		<div className='bg-[#f5f5f5] overflow-hidden py-[16px]'>
			<div className='grid wide'>
				<div className='flex shadow-[rgba(0,0,0,0.05)_0px_1px_1px_0px] overflow-hidden justify-between items-center mt-[0.9375rem] p-[1.5625rem] rounded-sm bg-[#fff]'>
					<div className='box-border flex max-w-[27.5rem] pr-[1.5625rem] border-r-[rgba(0,0,0,0.05)] border-r border-solid'>
						<div
							onClick={() => navigate(`/shop/${data?.id}`)}
							className='shrink-0 relative overflow-visible mr-5'>
							<div className='inline-block relative border box-border w-[5rem] h-[5rem] rounded-[50%] border-solid border-[rgba(0,0,0,0.09)]'>
								<div className=' w-full relative overflow-hidden pt-[100%] rounded-[50%]'></div>
								<img
									className='absolute w-full h-full block max-w-full rounded-[50%] left-0 top-0'
									src={data?.portrait}
									alt=''
								/>
							</div>
						</div>
						<div className='grow flex flex-col justify-between overflow-hidden'>
							<div className='font-normal text-base text-[rgba(0,0,0,0.87)] overflow-hidden text-ellipsis whitespace-nowrap'>
								{data?.username}
							</div>
							<div>
								<div className='text-sm text-[rgba(0,0,0,0.54)] capitalize'>Online 13 phút trước</div>
							</div>
							<div className='flex mt-[8px]'>
								<button
									type='button'
									className=' relative overflow-visible text-[#ee4d2d] !border shadow-[rgba(0,0,0,0.03)_0px_1px_1px_0px] flex-row capitalize inline-flex h-[34px] min-w-[60px] max-w-[190px] text-ellipsis text-sm !box-border items-center justify-center mr-2.5 px-[15px] py-0 rounded-sm !border-solid !border-[#ee4d2d]'
									style={{
										outline: 'none',
										background: 'rgba(255, 87, 34, 0.1)',
										WebkitLineClamp: 1
									}}>
									<svg
										viewBox='0 0 16 16'
										className='inline-block w-[1em] h-[1em] fill-current relative shrink-0 mr-[5px]'>
										<g fillRule='evenodd'>
											<path d='M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z' />
										</g>
									</svg>
									<span className='cursor-pointer' onClick={onChatWithShop}>
										Chat ngay
									</span>
								</button>
								<button
									onClick={() => navigate(`/shop/${data?.id}`)}
									className='flex-row capitalize h-[34px] min-w-[60px] max-w-[190px] inline-flex text-[#555] shadow-[0_1px_1px_0_rgba(0,0,0,0.03)] relative overflow-visible text-ellipsis text-sm box-border items-center justify-center px-[15px] py-0 rounded-sm hover:!bg-[rgba(0,0,0,0.02)] hover:border hover:border-solid hover:border-[rgba(0,0,0,0.09)]'
									style={{
										border: '1px solid #ccc',
										outline: 'none',
										background: '#fff',
										WebkitLineClamp: 1
									}}>
									<svg
										enableBackground='new 0 0 15 15'
										viewBox='0 0 15 15'
										x={0}
										y={0}
										strokeWidth={0}
										className='inline-block w-[1em] h-[1em] fill-current relative shrink-0 mr-[5px]'>
										<path d='m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z' />
									</svg>
									<span className='whitespace-nowrap overflow-hidden text-ellipsis'>Xem shop</span>
								</button>
							</div>
						</div>
					</div>
					<div className='!grid grid-cols-[repeat(3,auto)] gap-[1.25rem_3.125rem] text-[rgba(0,0,0,0.4)] grow pl-[1.5625rem]'>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Đánh giá</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>
								{data?.rating_bad + data?.rating_good + data?.rating_normal}
							</span>
						</div>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Tỉ lệ phản hồi</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>{data?.response_rate}%</span>
						</div>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Tham gia</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>6 năm trước</span>
						</div>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Sản phẩm</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>{data?.item_count}</span>
						</div>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Thời gian phản hồi</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>{data?.response_time}</span>
						</div>
						<div className='cursor-default flex justify-between relative overflow-visible'>
							<label className='text-[rgba(0,0,0,0.4)]'>Người theo dõi</label>
							<span className='text-[#ee4d2d] whitespace-nowrap text-right'>{data?.follower_count}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(ProductShopComponent)
