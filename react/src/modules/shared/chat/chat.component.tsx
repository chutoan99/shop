import { memo, useCallback, useEffect, useState } from 'react'

import { useAppSelector } from '../../../hooks/hooks'
import useSocketIo from '../../../hooks/useSocket'
import { useGetRoomsQuery } from './hooks'
import ItemChatComponent from './components/item-chat.components'
import { RootState } from '../../../redux'
import { RoomModel } from './interfaces'

function ChatComponent(): JSX.Element {
	const { listMess, socketIo, isLoadingRoom } = useSocketIo()
	const { data: dataRooms, isLoading, refetch } = useGetRoomsQuery()
	const [listRoom, setListRoom] = useState<RoomModel[] | null>(dataRooms?.response || [])
	const [room, setRoom] = useState<RoomModel | null>()
	const { is_popup_chat } = useAppSelector((state: RootState) => state.others)
	const { data } = useAppSelector((state: RootState) => state.user)
	const [isPopupChat, setIsPopupChat] = useState(is_popup_chat)
	const [isListChat, setIsListChat] = useState(false)
	const [isChat, setIsChat] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		is_popup_chat && setIsPopupChat(is_popup_chat)
		refetch()
	}, [is_popup_chat])

	useEffect(() => {
		if (!dataRooms) return
		dataRooms && setListRoom(dataRooms?.response)
	}, [dataRooms])

	useEffect(() => {
		if (room?.id) {
			setIsListChat(true)
			onRoom(room.id)
		}
	}, [room])

	const onAddMess = () => {
		socketIo.emit('message', {
			user: data,
			shop: room?.shop_info,
			roomid: room?.id,
			message
		})
		setMessage('')
	}

	const onRoom = (roomid: number) => {
		socketIo.emit('room', roomid)
	}

	const onToggleListChat = useCallback(() => {
		setIsListChat((prevIsListChat) => !prevIsListChat)
	}, [])

	return (
		<div className='right-[10px] bottom-[10px] z-10' style={{ position: 'fixed' }}>
			{isPopupChat && (
				<div className='bg-[#fff] border shadow-[0_4px_20px_0_rgb(74_74_78_/_16%)] h-[502px] relative translate-x-0 transition-[width] duration-[0.25s] ease-[cubic-bezier(0.4,0.8,0.74,1)] border-solid border-[#dcdce0]'>
					<div
						className='items-center shadow-[0_1px_4px_0_rgb(0_0_0_/_8%)] flex h-10 justify-between w-full box-border rounded-[4px_4px_0_0]'
						style={{ borderBottom: '1px solid #ccc' }}>
						<div className='items-center flex justify-start px-3 py-0'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 44 22'
								className='fill-current inline-block leading-[0] text-[#ee4d2d] h-[22px] w-11'>
								<path d='M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z'></path>
							</svg>

							<div className='items-center text-[#ee4d2d] flex text-xs ml-2'>
								<svg
									viewBox='0 0 3 12'
									xmlns='http://www.w3.org/2000/svg'
									className='fill-current inline-block leading-[0] text-[#ee4d2d] h-3 w-[3px]'>
									<path d='M2.788 12L3 11.383c-.514-.443-.959-1.113-1.335-2.013-.376-.9-.564-2.01-.564-3.333v-.074c0-1.323.189-2.434.567-3.333.378-.9.822-1.553 1.332-1.961L2.788.006 2.754 0C2.102.354 1.48 1.063.888 2.127.296 3.19 0 4.473 0 5.974v.052c0 1.505.296 2.789.888 3.85.592 1.062 1.214 1.77 1.866 2.124h.034z'></path>
								</svg>
								16
								<svg
									viewBox='0 0 3 12'
									xmlns='http://www.w3.org/2000/svg'
									className='fill-current inline-block leading-[0] text-[#ee4d2d] h-3 w-[3px]'>
									<path d='M.246 12c.648-.354 1.269-1.062 1.863-2.124C2.703 8.815 3 7.531 3 6.026v-.052c0-1.501-.297-2.784-.891-3.847C1.515 1.063.894.354.246 0H.212L0 .617c.48.42.917 1.09 1.31 2.01.393.92.59 2.032.59 3.336v.074c0 1.33-.191 2.454-.573 3.37-.382.917-.824 1.575-1.327 1.976L.212 12h.034z'></path>
								</svg>
							</div>
						</div>
						<div className='items-center flex justify-end mr-3'>
							<div className='ml-[16px]' onClick={onToggleListChat}>
								<div>
									{isListChat ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 16 16'
											className='fill-current inline-block leading-[0] text-[#333] cursor-pointer h-4 w-4'>
											<path d='M14 1a1 1 0 011 1v12a1 1 0 01-1 1H9v-1h5V2H9V1h5zM2 13v1h1v1H2a1 1 0 01-.993-.883L1 14v-1h1zm6 1v1H4v-1h4zM2 3.999V12H1V3.999h1zm5.854 1.319l2.828 2.828a.5.5 0 010 .708l-2.828 2.828a.5.5 0 11-.708-.707L9.121 9H4.5a.5.5 0 010-1h4.621L7.146 6.025a.5.5 0 11.708-.707zM3 1v1H2v.999H1V2a1 1 0 01.883-.993L2 1h1zm5 0v1H4V1h4z'></path>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 16 16'
											className='fill-current inline-block leading-[0] text-[#333] cursor-pointer h-4 w-4'>
											<path d='M14 1a1 1 0 011 1v12a1 1 0 01-1 1H9v-1h5V2H9V1h5zM2 13v1h1v1H2a1 1 0 01-.993-.883L1 14v-1h1zm6 1v1H4v-1h4zM2 3.999V12H1V3.999h1zm4.975 1.319a.5.5 0 01.707.707L5.707 8h4.621a.5.5 0 010 1h-4.62l1.974 1.975a.5.5 0 01-.707.707L4.146 8.854a.5.5 0 010-.708zM3 1v1H2v.999H1V2a1 1 0 01.883-.993L2 1h1zm5 0v1H4V1h4z'></path>
										</svg>
									)}
								</div>
							</div>
							<div className='ml-[16px]' onClick={() => setIsPopupChat(false)}>
								<div>
									<svg
										viewBox='0 0 16 16'
										xmlns='http://www.w3.org/2000/svg'
										className='fill-current inline-block leading-[0] text-[#333] cursor-pointer h-4 w-4'>
										<path d='M14 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12zm0 1H2v12h12V2zm-2.904 5.268l-2.828 2.828a.5.5 0 01-.707 0L4.732 7.268a.5.5 0 11.707-.707l2.475 2.475L10.39 6.56a.5.5 0 11.707.707z'></path>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div className='flex flex-col h-[504px]'>
						<div className='  w-full flex'>
							{isListChat && (
								<div className='h-full w-[409px]' style={{ borderRight: '1px solid #ccc' }}>
									{isChat ? (
										<div>
											<div className='min-h-[340px] max-h-[340px] pt-[20px] flex flex-col h-full overflow-x-auto pb-[20px] overflow-y-scroll'>
												{isLoadingRoom && (
													<div className='w-full h-[300px] flex justify-center items-center'>
														<svg
															aria-hidden='true'
															className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600  fill-[#ee4d2d]'
															viewBox='0 0 100 101'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'>
															<path
																d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
																fill='currentColor'
															/>
															<path
																d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
																fill='currentFill'
															/>
														</svg>
													</div>
												)}
												{!isLoadingRoom && (
													<div className='flex flex-col h-full'>
														{listMess && listMess?.length > 0 ? (
															<div className='grid grid-cols-12 gap-y-2'>
																{listMess?.map((item: any) => (
																	<div key={item?.id}>
																		{+item?.from_id === +data?.userid ? (
																			<div className='col-start-6 col-end-13 p-2 rounded-lg'>
																				<div className='flex items-center justify-start flex-row-reverse'>
																					<div className='flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0'>
																						<img
																							src={data?.avatar}
																							alt={data.name}
																							className='w-8 h-8 rounded-full'
																						/>
																					</div>
																					<div className='relative mr-3 text-sm bg-indigo-100 py-2 px-3 shadow rounded-xl'>
																						<div>{item?.content?.mess}</div>
																					</div>
																				</div>
																			</div>
																		) : (
																			<div className='p-2 rounded-lg col-start-1 col-end-8'>
																				<div className='flex flex-row items-center'>
																					<div className='flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0'>
																						A
																					</div>
																					<div className='relative ml-3 text-sm bg-[#fff] py-2 px-3 shadow rounded-xl'>
																						<div>{item?.content?.mess}</div>
																					</div>
																				</div>
																			</div>
																		)}
																	</div>
																))}
															</div>
														) : (
															<div className='flex justify-center items-center h-full'>
																<div className='w-[161px]'>
																	<img
																		src='/assets/Img/chat_emty.png'
																		className='h-full w-full'
																		alt=''
																	/>
																</div>
															</div>
														)}
													</div>
												)}
											</div>
											<div
												className='flex flex-col mb-[10px]'
												style={{
													borderTop: '1px solid #ccc'
												}}>
												<textarea
													className='p-[10px]'
													placeholder='Nhập nội dung tin nhắn'
													spellCheck='false'
													value={message}
													style={{
														overflow: 'auto',
														height: '80px',
														outline: 'none'
													}}
													onChange={(e) => setMessage(e.target.value)}></textarea>
												<div className='w-full px-[10px]'>
													<div className='flex justify-between  w-full'>
														<div className='flex gap-[7px]'>
															<div>
																<svg
																	viewBox='0 0 18 18'
																	xmlns='http://www.w3.org/2000/svg'
																	className='fill-current inline-block leading-[0] w-[18px] h-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#8ea4d1]'>
																	<path d='M9 1a8 8 0 110 16A8 8 0 019 1zm0 1.6a6.4 6.4 0 100 12.8A6.4 6.4 0 009 2.6zM5 9.8h8a4 4 0 01-7.995.2L5 9.8h8-8zm1.2-4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm5.6 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'></path>
																</svg>
															</div>
															<div>
																<input
																	accept='image/png,image/jpeg,image/jpg'
																	type='file'
																	style={{
																		display: 'none'
																	}}
																/>
																<div>
																	<svg
																		viewBox='0 0 24 24'
																		xmlns='http://www.w3.org/2000/svg'
																		className='fill-current inline-block leading-[0] w-[18px] h-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#8ea4d1]'>
																		<path d='M19 18.974V5H5v14h.005l4.775-5.594a.5.5 0 01.656-.093L19 18.974zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z'></path>
																	</svg>
																</div>
															</div>
															<div>
																<input
																	accept='video/*,.flv,.3gp,.rm,.rmvb,.asf,.mp4,.webm'
																	type='file'
																	style={{
																		display: 'none'
																	}}
																/>
																<div>
																	<svg
																		viewBox='0 0 24 24'
																		xmlns='http://www.w3.org/2000/svg'
																		className='fill-current inline-block leading-[0] w-[18px] h-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#8ea4d1]'>
																		<path
																			fillRule='evenodd'
																			clipRule='evenodd'
																			d='M19.974 3h-16a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zm-15 16V5h14v14h-14z'></path>
																		<path d='M15.42 11.733a.3.3 0 010 .534L9.627 15.24a.3.3 0 01-.437-.267V9.027a.3.3 0 01.437-.267l5.793 2.973z'></path>
																	</svg>
																</div>
															</div>
															<div>
																<svg
																	viewBox='0 0 18 18'
																	xmlns='http://www.w3.org/2000/svg'
																	className='fill-current inline-block leading-[0] w-[18px] h-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#8ea4d1]'>
																	<path d='M14.442 2c.413 0 .753.322.776.735l.692 12.444a.778.778 0 01-.734.82l-.043.001H2.777a.778.778 0 01-.772-.687L2 15.2l.692-12.466A.778.778 0 013.47 2h10.973zm-.736 1.556H4.204L3.734 12h10.441l-.469-8.444zm-1.64 1.556v1.042l-.004.149C11.978 7.825 10.601 9 8.955 9c-1.698 0-3.11-1.252-3.11-2.846V5.12H7.4v1.034l.005.103c.063.646.716 1.187 1.55 1.187.879 0 1.556-.6 1.556-1.29V5.111h1.555z'></path>
																</svg>
															</div>
															<div>
																<svg
																	viewBox='0 0 18 18'
																	xmlns='http://www.w3.org/2000/svg'
																	className='fill-current inline-block leading-[0] w-[18px] h-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#8ea4d1]'>
																	<path d='M5.111 2.003v1.365h7.778V2.003h2.333c.43 0 .778.354.778.79v8.44a2 2 0 01-.575 1.404l-2.726 2.767a2 2 0 01-1.425.596H2.778A.784.784 0 012 15.21V2.794c0-.436.348-.79.778-.79H5.11zm9.333 2.944H3.556v9.474H11V11.5a.5.5 0 01.5-.5h2.944V4.947zM12.89 8.105v1.58H5.11v-1.58h7.778zM11.61 1a.5.5 0 01.5.5v1.079H5.89V1.5a.5.5 0 01.5-.5h5.222z'></path>
																</svg>
															</div>
														</div>
														<i
															className='fill-current inline-block leading-[0] h-[18px] w-[18px] transition-[color] duration-[0.2s] ease-[ease] text-[#ccc] cursor-pointer'
															style={{
																WebkitMaskRepeat: 'no-repeat',
																WebkitMaskPosition: 'center',
																WebkitMaskSize: 'contain'
															}}
															onClick={onAddMess}>
															<svg
																viewBox='0 0 24 24'
																xmlns='http://www.w3.org/2000/svg'
																fill={message && '#f7472e'}>
																<path d='M4 14.497v3.724L18.409 12 4 5.779v3.718l10 2.5-10 2.5zM2.698 3.038l18.63 8.044a1 1 0 010 1.836l-18.63 8.044a.5.5 0 01-.698-.46V3.498a.5.5 0 01.698-.459z'></path>
															</svg>
														</i>
													</div>
												</div>
											</div>
										</div>
									) : (
										<div className='h-[451px]  pb-[20px]'>
											<div className='flex justify-center items-center w-full h-full'>
												<div className='h-full w-full flex justify-center items-center'>
													<img
														src='/assets/Img/chat_emty.png'
														className=' h-[144px]'
														alt=''
													/>
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							<div className=' w-[220px] bg-[#fff]'>
								<div
									aria-label='grid'
									aria-readonly='true'
									role='grid'
									style={{
										boxSizing: 'border-box',
										direction: 'ltr',
										width: '220px',
										willChange: 'transform',
										overflow: 'auto'
									}}>
									{!isLoading && (
										<ItemChatComponent
											data={listRoom || []}
											setRoom={setRoom}
											setIsChat={setIsChat}
											des='Honey ơi, sản phẩm bạn thích đang giảm mạnh đến 50'
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{!isPopupChat && (
				<div
					className='right-[10px] bottom-[10px] z-10'
					style={{ position: 'fixed' }}
					onClick={() => setIsPopupChat(true)}>
					<div className='items-center shadow-[0_4px_20px_0_rgb(28_28_51_/_16%)] box-border flex h-12 justify-between relative translate-x-0 origin-bottom-right transition-[background-color] duration-[0.15s] ease-[ease-out] w-[100px] bg-[#ee4d2d] rounded-[4px_4px_0_0]'>
						<div className='justify-center items-center cursor-pointer flex p-3'>
							<div className='border box-border text-[#fff] text-xs h-[18px] overflow-hidden absolute top-[-9px] px-[5px] py-px rounded-[9px] border-solid border-[#f6f6f6] -right-1 bg-[#ee4d2d]'>
								16
							</div>
							<i className='fill-current inline-block leading-[0] h-6 opacity-100 w-6 mr-2 text-[#fff]'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1 0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1 1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1 13.835V2.57a1 1 0 011-1h13.22zmo-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0 01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2 8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z'></path>
								</svg>
							</i>
							<span className='text-[#fff]'>Chat</span>
							<i className='fill-current inline-block leading-[0] text-[#fff]'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 22'>
									<path d='M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z'></path>
								</svg>
							</i>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
export default memo(ChatComponent)
