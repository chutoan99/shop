import { toast } from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { memo, useState } from 'react'
import { Rating } from 'react-rainbow-components'
import { CreateComment } from '../services'
import { LoadingDefaultComponent } from '../../shared/loading'
import { CreateCommentDto } from '../interfaces'
import { PostBaseModel } from '../../post/interfaces'
import { OrderModel } from '../../order/interfaces'

type ModelRattingProps = {
	isShow: boolean
	onClose: any
	data: OrderModel
}

function ModelRattingComponent({ isShow, onClose, data }: ModelRattingProps): JSX.Element {
	const [imageUrls, setImageUrls] = useState<Record<number, string[]>>(
		data.posts.reduce(
			(acc, _item, index) => {
				acc[index] = []
				return acc
			},
			{} as Record<number, string[]>
		)
	)
	const [fileImages, setFileImages] = useState<Record<number, File[]>>(
		data.posts.reduce(
			(acc, _item, index) => {
				acc[index] = []
				return acc
			},
			{} as Record<number, File[]>
		)
	)
	const [loading, setLoading] = useState(false)
	const [payLoad, setPayload] = useState<Record<number, CreateCommentDto>>(
		data.posts.reduce(
			(acc, item: PostBaseModel, index: number) => {
				acc[index] = {
					itemid: item.id,
					shopid: item.shopid,
					orderid: item.id,
					options: data.item_option?.split(',')[index],
					model_name: data.tierVariation?.split(',')[index],
					rating_star: 5,
					comment: '',
					images: []
				}
				return acc
			},
			{} as Record<number, CreateCommentDto>
		)
	)

	const onFileChange = (event: any, index: number) => {
		const files: any[] = event.target.files
		if (files.length > 5) {
			toast.error('Bạn chỉ được tải tối đa 5 ảnh')
			event.target.value = ''
			return
		}

		if (files) {
			const newImages = Array.from(files).map((file) => URL.createObjectURL(file))

			setImageUrls((prevState) => ({
				...prevState,
				[index]: newImages
			}))

			setFileImages((prevState) => ({
				...prevState,
				[index]: files // Convert FileList to Array<File>
			}))

			setPayload((prevState) => ({
				...prevState,
				[index]: {
					...prevState[index],
					images: files
				}
			}))
		}
	}

	const onNewFileChange = (event: any, index: number) => {
		const files: any[] = event.target.files
		if (fileImages[index].length + 1 > 5) {
			toast.error('Bạn chỉ được tải tối đa 5 ảnh')
			event.target.value = ''
			return
		}
		if (files) {
			setImageUrls((prevState) => ({
				...prevState,
				[index]: [...prevState[index], URL.createObjectURL(files[0])]
			}))

			setFileImages((prevState) => ({
				...prevState,
				[index]: [...prevState[index], files[0]]
			}))

			setPayload((prevState) => ({
				...prevState,
				[index]: {
					...prevState[index],
					images: [...prevState[index].images, files[0]]
				}
			}))
		}
	}

	const onRemoveFile = (index: number, url: string) => {
		setImageUrls((prevState) => ({
			...prevState,
			[index]: prevState[index].filter((image) => image !== url)
		}))
	}

	const handleRatingChange = (index: number, value: number) => {
		setPayload((prevState) => ({
			...prevState,
			[index]: {
				...prevState[index],
				rating_star: value
			}
		}))
	}

	const handleCommentChange = (index: number, value: string) => {
		setPayload((prevState) => ({
			...prevState,
			[index]: {
				...prevState[index],
				comment: value
			}
		}))
	}

	const onSubmit = () => {
		try {
			setLoading(true)
			Object.entries(payLoad).forEach((_, index) => {
				CreateComment(payLoad[index]).then((response) => {
					if (response.err === 0) {
						onClose()
						toast.success('Bạn vừa thêm bình luận')
					}
				})
			})
		} catch (err: any) {
			console.log(err)
		} finally {
			onClose()
			setLoading(false)
		}
	}

	return (
		<>
			{loading && <LoadingDefaultComponent />}
			{isShow && (
				<div id='modal'>
					<div className='fixed z-[600] inset-0'>
						<div className='w-full h-full bg-[rgba(0,0,0,0.4)]' onClick={onClose} />
						<div className='absolute -translate-x-2/4 -translate-y-2/4 overflow-visible max-h-full max-w-full left-2/4 top-2/4'>
							<div style={{ display: 'contents' }}>
								<div className='max-h-[calc(100vh_-_120px)] w-[45.625rem] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] max-w-full box-border flex flex-col overflow-hidden pt-[30px] pb-0 px-[30px]  bg-[#fff]'>
									<div className='h-[unset] flex items-center mb-[1.875rem]'>
										<div className='font-normal text-xl text-[#222] capitalize flex items-center'>
											Đánh giá sản phẩm
										</div>
									</div>
									<div className='flex-1 overflow-y-auto mr-[-50px] ml-[-50px] relative pb-[100px] px-[50px]'>
										<div className='flex flex-col gap-[20px]'>
											{data?.posts?.map((post: any, index: number) => (
												<div>
													<NavLink to='#' key={post?.itemid} className='mb-[10px]'>
														<span className='items-center flex-nowrap text-[rgba(0,0,0,0.87)] flex pt-3 pb-0 px-0'>
															<div />
															<div className='flex-1 items-start flex-nowrap flex pl-0 pr-3 py-0'>
																<div className=' w-[81px] h-[81px]'>
																	<NavLink
																		to={`/user/purchase/order/${post.orderid}`}
																		className='relative'>
																		<div className='w-20 h-20 mr-3'>
																			<img
																				className='w-full h-full'
																				src={post?.image}
																				alt={post?.name}
																			/>
																		</div>
																		<div
																			className='bg-[50%] bg-cover bg-no-repeat absolute w-full h-full left-0 top-0'
																			style={{
																				backgroundImage: `${post?.image}`
																			}}>
																			<div className='w-full h-full'></div>
																		</div>
																	</NavLink>
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
																			Phân loại hàng:{' '}
																			{data?.tierVariation?.split(',')[index]},{' '}
																			{data?.item_option?.split(',')[index]}
																		</div>
																	</div>
																</div>
															</div>
														</span>
														<div className='h-2.5 border-b-[rgba(0,0,0,0.09)] border-b border-solid' />
													</NavLink>
													<div
														style={{
															margin: '20px 0px'
														}}>
														<div className='flex items-center'>
															<div className='min-w-[180px]'>
																<span>Chất lượng sản phẩm</span>
															</div>
															<div className='rainbow-m-around_big'>
																<Rating
																	value={payLoad[index]?.rating_star || 5}
																	onChange={(e: any) =>
																		handleRatingChange(index, +e.target.value)
																	}
																/>
															</div>
															<span
																className='min-w-[100px] ml-2.5'
																style={{
																	color: 'rgb(237, 165, 0)'
																}}>
																{
																	[
																		'Tệ',
																		'Không hài lòng',
																		'Bình thường',
																		'Hài lòng',
																		'Tuyệt vời'
																	][(payLoad[index]?.rating_star || 5) - 1]
																}
															</span>
														</div>
													</div>
													<div className='relative bg-neutral-100 pt-5 pb-[0.9375rem] px-[1.5625rem]'>
														<div className='relative bg-[#fff] box-border shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.09)] border mt-0 mb-3 mx-0 p-3 rounded-sm border-solid border-[rgba(0,0,0,0.26)]'>
															<div className='relative mt-0 mb-3 mx-0 p-0'>
																<div
																	className='bg-[#fff] leading-5 text-base relative text-[rgba(0,0,0,0.87)] mb-1 left-0 top-0'
																	style={{
																		fontWeight: 'normal'
																	}}>
																	Chất lượng sản phẩm:
																</div>
																<textarea
																	className='overflow-hidden resize-none leading-5 text-base w-full h-5 text-[rgba(0,0,0,0.87)] m-0 p-0 border-0 focus:border-0 focus:outline-0'
																	rows={1}
																	placeholder='để lại đánh giá.'
																	defaultValue={''}
																/>
															</div>
															<div className='relative mt-0 mb-3 mx-0 p-0'>
																<div
																	className='bg-[#fff] leading-5 text-base relative text-[rgba(0,0,0,0.87)] mb-1 left-0 top-0'
																	style={{
																		fontWeight: 'normal'
																	}}>
																	Đúng với mô tả:
																</div>
																<div id='textarea-label' className='hidden'>
																	feedback
																</div>
																<textarea
																	aria-labelledby='textarea-label'
																	className='overflow-hidden resize-none leading-5 text-base w-full h-5 text-[rgba(0,0,0,0.87)] m-0 p-0 border-0 focus:border-0 focus:outline-0'
																	rows={1}
																	placeholder='Type here...'
																	defaultValue={''}
																/>
															</div>
															<div className='h-px w-full bg-[rgba(0,0,0,0.09)] mt-0 mb-3 mx-0 p-0' />
															<div
																style={{
																	position: 'relative'
																}}>
																<textarea
																	className='overflow-hidden resize-none leading-5 text-base w-full h-5 text-[rgba(0,0,0,0.87)]  p-0 border-0 focus:border-0 focus:outline-0'
																	rows={3}
																	placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé.'
																	style={{
																		minHeight: 100,
																		color: 'rgba(0, 0, 0, 0.87)'
																	}}
																	value={payLoad[index]?.comment}
																	onChange={(e: any) =>
																		handleCommentChange(index, e.target.value)
																	}
																/>
															</div>
														</div>
														{imageUrls[index] && imageUrls[index].length === 0 && (
															<div className='flex justify-start items-center'>
																<label className='border box-border h-[30px] items-center flex text-[#ee4d2d]  cursor-pointer mr-2 px-3 py-0 border-solid !border-[#ee4d2d] bg-[#fef6f5]'>
																	<svg
																		width={20}
																		height={18}
																		viewBox='0 0 20 18'
																		fill='none'>
																		<path
																			fillRule='evenodd'
																			clipRule='evenodd'
																			d='M6.15377 9.76895C6.15377 11.8927 7.87492 13.6151 9.99992 13.6151C12.1236 13.6151 13.8461 11.8927 13.8461 9.76895C13.8461 7.6446 12.1236 5.9228 9.99992 5.9228C7.87492 5.9228 6.15377 7.6446 6.15377 9.76895ZM5 9.76896C5 7.00771 7.23813 4.76896 10 4.76896C12.7613 4.76896 15 7.00771 15 9.76896C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76896ZM1.15385 17.2606C0.489784 17.2606 0 16.7249 0 16.0662V4.12218C0 3.46224 0.489784 2.8459 1.15385 2.8459H4.61538L5.21635 1.73267C5.21635 1.73267 5.75421 0.538208 6.41827 0.538208H13.5817C14.2452 0.538208 14.7837 1.73267 14.7837 1.73267L15.3846 2.8459H18.8462C19.5096 2.8459 20 3.46224 20 4.12218V16.0662C20 16.7249 19.5096 17.2606 18.8462 17.2606H1.15385Z'
																			fill='#EE4D2D'
																		/>
																	</svg>
																	<span className='text-sm leading-[14px] font-normal ml-1.5'>
																		Thêm Hình ảnh
																	</span>
																	<input
																		className='hidden'
																		type='file'
																		accept='image/*'
																		multiple
																		onChange={(e: any) => onFileChange(e, index)}
																	/>
																</label>
															</div>
														)}
														<div className='flex justify-start items-center'>
															{imageUrls[index]?.map((url, indexImage) => (
																<div
																	key={index}
																	className='w-[54px] h-[54px] relative overflow-hidden bg-cover bg-[50%] bg-no-repeat mr-1.5'
																	style={{
																		backgroundImage: `url('${url}')`,
																		border: 'none'
																	}}>
																	<button type='button' title='Submit'>
																		<svg
																			width={10}
																			height={10}
																			viewBox='0 0 10 10'
																			fill='none'
																			onClick={() => onRemoveFile(index, url)}>
																			<path
																				fillRule='evenodd'
																				clipRule='evenodd'
																				d='M8.28268 0.908882C8.47794 0.71362 8.79452 0.71362 8.98978 0.908882L9.0908 1.0099C9.28606 1.20516 9.28606 1.52174 9.0908 1.717L1.71669 9.09112C1.52142 9.28638 1.20484 9.28638 1.00958 9.09112L0.908564 8.9901C0.713301 8.79484 0.713301 8.47826 0.908563 8.283L8.28268 0.908882Z'
																				fill='#F6F6F6'
																			/>
																			<path
																				fillRule='evenodd'
																				clipRule='evenodd'
																				d='M1.00973 0.908882C1.20499 0.71362 1.52157 0.71362 1.71683 0.908882L9.09095 8.28299C9.28621 8.47826 9.28621 8.79484 9.09095 8.9901L8.98993 9.09112C8.79467 9.28638 8.47809 9.28638 8.28283 9.09112L0.908713 1.717C0.713451 1.52174 0.71345 1.20516 0.908713 1.0099L1.00973 0.908882Z'
																				fill='#F6F6F6'
																			/>
																		</svg>
																	</button>
																</div>
															))}
															{imageUrls[index].length > 0 && (
																<>
																	{Array.from({
																		length: 5 - imageUrls[index]?.length
																	}).map((_, index: number) => (
																		<>
																			<label
																				className='w-[54px] h-[54px] box-border inline-flex flex-col items-center justify-center cursor-pointer mr-1.5 bg-[#fff]'
																				style={{
																					border: '1px dashed rgba(0, 0, 0, 0.26)'
																				}}
																				key={index}>
																				<svg
																					width={20}
																					height={18}
																					viewBox='0 0 20 18'
																					fill='none'>
																					<svg
																						width={20}
																						height={18}
																						viewBox='0 0 20 18'
																						fill='none'>
																						<path
																							fillRule='evenodd'
																							clipRule='evenodd'
																							d='M6.15377 9.76902C6.15377 11.8927 7.87492 13.6152 9.99992 13.6152C12.1236 13.6152 13.8461 11.8927 13.8461 9.76902C13.8461 7.64466 12.1236 5.92286 9.99992 5.92286C7.87492 5.92286 6.15377 7.64466 6.15377 9.76902ZM5 9.76902C5 7.00777 7.23813 4.76902 10 4.76902C12.7613 4.76902 15 7.00777 15 9.76902C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76902ZM1.15385 17.2607C0.489784 17.2607 0 16.725 0 16.0662V4.12224C0 3.4623 0.489784 2.84596 1.15385 2.84596H4.61538L5.21635 1.73273C5.21635 1.73273 5.75421 0.538269 6.41827 0.538269H13.5817C14.2452 0.538269 14.7837 1.73273 14.7837 1.73273L15.3846 2.84596H18.8462C19.5096 2.84596 20 3.4623 20 4.12224V16.0662C20 16.725 19.5096 17.2607 18.8462 17.2607H1.15385Z'
																							fill='black'
																							fillOpacity='0.26'
																						/>
																					</svg>
																				</svg>

																				<div>
																					<label
																						htmlFor='file-upload'
																						className='hidden'>
																						Upload your images
																					</label>
																					<input
																						className='hidden'
																						id='file-upload'
																						style={{
																							display: 'none'
																						}}
																						type='file'
																						accept='image/*'
																						onChange={(e: any) =>
																							onNewFileChange(e, index)
																						}
																					/>
																				</div>
																			</label>
																		</>
																	))}
																</>
															)}
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									<div
										className='absolute flex justify-end h-[84px] uppercase items-center box-border px-[30px] py-[22px] rounded-br-[3px] rounded-bl-[3px] bottom-0 inset-x-0'
										style={{
											background: 'linear-gradient(hsla(0, 0%, 100%, 0.9), #fff)'
										}}>
										<div className='flex justify-end  gap-[10px]'>
											<button
												className='overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] border flex items-center justify-center capitalize h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline px-3 py-0 rounded-sm border-solid border-[#ccc]'
												onClick={onClose}>
												TRỞ LẠI
											</button>
											<button
												className='overflow-hidden text-ellipsis flex-col text-sm box-border text-[#fff]  h-[34px] min-w-[105px] text-[0.9rem] leading-[1.6rem] no-underline flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.09)] px-2.5 py-0 rounded-sm border-0 bg-[#ee4d2d]'
												onClick={onSubmit}>
												Hoàn thành
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default memo(ModelRattingComponent)
