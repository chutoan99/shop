import { IRoomExtra } from '@models/room.model'
import { datePipe } from '@utils/pipe.until'

type ItemChatProps = {
	data: IRoomExtra[] | []
	des: string
	setIsChat: any
	setCurrentRoom: any
}

export default function ItemChatComponent({ data, des, setIsChat, setCurrentRoom }: ItemChatProps): JSX.Element {
	const onChangeShop = (room: IRoomExtra) => {
		setIsChat(true)
		setCurrentRoom(room)
	}
	return (
		<>
			{data.map((room: IRoomExtra) => (
				<div
					onClick={() => onChangeShop(room)}
					className='items-center box-border flex justify-center overflow-hidden relative p-3 h-[56px] w-full cursor-pointer '
					key={room._id}>
					<div className='h-8 min-w-[32px] w-8'>
						<div
							className='items-center text-[#fff] flex text-[0] font-medium h-full justify-center overflow-hidden w-full rounded-sm'
							style={{ backgroundColor: 'unset' }}>
							<div className='w-full h-full'>
								<div className='flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 border-[1px] border-[#cccccc] border-solid'>
									<img src={room?.shop?.portrait} className='w-8 h-8 rounded-full' alt='' />
								</div>
							</div>
						</div>
					</div>
					<div className='flex gap-[2px] flex-col shrink-0 justify-center w-[156px] ml-2.5'>
						<div className='items-center flex justify-between'>
							<div className='text-[#333] text-[13px] font-bold leading-[15px] max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap mr-1'>
								{room?.shop?.username}
							</div>
							<div className='flex items-center'>
								<div className='text-[#bbb] text-xs leading-[14px] translate-x-0.5 whitespace-nowrap scale-[0.91]'>
									{datePipe(room.created_at, 'DD/MM')}
								</div>
							</div>
						</div>
						<div className='items-center flex justify-between'>
							<div className='text-[#888] text-xs leading-[14px] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap mr-1'>
								<span title='Honey ơi, sản phẩm bạn thích đang giảm mạnh đến 50'>{des}</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
