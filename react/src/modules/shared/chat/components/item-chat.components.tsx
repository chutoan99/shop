import { RoomModel } from '../interfaces'

type ItemChatProps = {
	data: RoomModel[] | []
	des: string
	setIsChat: any
	setRoom: any
}

export default function ItemChatComponent({ data, des, setIsChat, setRoom }: ItemChatProps): JSX.Element {
	const onChangeShop = (room: RoomModel) => {
		setIsChat(true)
		setRoom(room)
	}
	return (
		<>
			{data.map((room: RoomModel) => (
				<div
					onClick={() => onChangeShop(room)}
					className='items-center box-border flex justify-center overflow-hidden relative p-3 h-[56px] w-full cursor-pointer '
					key={room.id}>
					<div className='h-8 min-w-[32px] w-8'>
						<div
							className='items-center text-[#fff] flex text-[0] font-medium h-full justify-center overflow-hidden w-full rounded-sm'
							style={{ backgroundColor: 'unset' }}>
							<div className='w-full h-full'>
								<div className='flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0'>
									<img src={room?.shop_info?.portrait} className='w-8 h-8 rounded-full' alt='' />
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col shrink-0 justify-center w-[156px] ml-2.5'>
						<div className='items-center flex justify-between'>
							<div className='text-[#333] text-[13px] font-bold leading-[15px] max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap mr-1'>
								{room?.shop_info?.username}
							</div>
						</div>
						<div className='items-center flex justify-between'>
							<div className='text-[#888] text-xs leading-[14px] max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap mr-1'>
								<span title='Honey ơi, sản phẩm bạn thích đang giảm mạnh đến 50'>{des}</span>
							</div>
							<div className='flex items-center'>
								<div className='text-[#bbb] text-xs leading-[14px] translate-x-0.5 whitespace-nowrap scale-[0.91]'>
									06/06
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
