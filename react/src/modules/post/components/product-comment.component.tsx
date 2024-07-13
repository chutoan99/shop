import { useEffect, useState } from 'react'
import { Rating } from 'react-rainbow-components'

import { formatTime } from '../../../utils/generateTime'
import { useParams } from 'react-router-dom'
import { useGetCommentsQuery } from '../../comment/hooks'
import { generateStart } from '../helpers'
import { CommentModel } from '../../comment/interfaces'

function ProductCommentComponent() {
	const params = useParams()
	const [data, setData] = useState<CommentModel[]>([])
	const [active, setActive] = useState('fa-solid fa-thumbs-up')
	const { data: dataComments } = useGetCommentsQuery(params)
	const [number, setNumber] = useState(0)
	const handleChangeStatus = () => {
		setActive('fa-solid fa-thumbs-up icons-active')
		setNumber(number + 1)
	}
	useEffect(() => {
		dataComments?.response && setData(dataComments?.response || [])
	}, [dataComments])

	return (
		<div className='bg-[#f5f5f5] overflow-hidden py-[12px]'>
			<div className='grid wide'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bg-[#fff] overflow-hidden mt-[0.9375rem] p-2.5 rounded-sm'>
							<div className='pt-[0.9375rem] pb-0 px-[0.9375rem]'>
								<p className='text-lg text-[rgba(0,0,0,0.87)] capitalize mb-[1em]'>ĐÁNH GIÁ SẢN PHẨM</p>
								<div className='bg-[#fffbf8] min-h-[5rem] border !grid grid-cols-[0.2fr_1fr] items-center box-border mb-4 p-[1.875rem] rounded-sm border-solid border-[#f9ede5]'>
									<div className='text-center h-[84px] mr-[1.875rem]'>
										<div>
											<span className='text-[#ee4d2d] text-[1.875rem]'>
												4.9 <label className='text-[#ee4d2d] text-[1.125rem]'>trên 5</label>
											</span>
										</div>
										<div className='flex !text-[#ee4d2d] !text-3xl'>{generateStart(5)}</div>
									</div>
									<div>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm  border-[rgba(0,0,0,0.09)] !text-[#ee4d2d]   !border-solid !border-[#ee4d2d]'>
											Tất Cả
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											5 Sao{' '}
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											4 Sao{' '}
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											3 Sao{' '}
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											2 Sao{' '}
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											1 Sao{' '}
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											Có Bình Luận
										</span>
										<span className='select-none h-8 leading-8 min-w-[6.25rem] text-center bg-[#fff] border box-border inline-block no-underline text-[rgba(0,0,0,0.87)] capitalize mr-2 my-[0.3125rem] px-2.5 py-0 rounded-sm border-solid border-[rgba(0,0,0,0.09)]'>
											Có Hình Ảnh/ Video
										</span>
									</div>
								</div>
								{data?.length > 0 ? (
									data?.map((item: CommentModel, index: number) => {
										return (
											<div
												className='!grid grid-cols-[0.06fr_1fr] pl-[1.25rem] pr-0 py-[1rem] border-b-[rgba(0,0,0,0.09)] border-b border-solid'
												key={index}>
												<div className='w-[2.5rem] h-[2.5rem]'>
													<img
														src={item?.author_portrait}
														alt='item'
														className='w-full h-full rounded-[50%]'
													/>
												</div>
												<div className='flex flex-col gap-[5px]'>
													<h3>{item?.author_username}</h3>
													<div>
														<div className='rainbow-m-around_small flex'>
															<Rating value={item.rating_star} readOnly />
														</div>
													</div>
													{formatTime(item?.createdAt)}
													<p className='relative box-border text-sm leading-5 text-[rgba(0,0,0,0.87)] whitespace-pre-wrap mx-0 mb-[0.9375rem]'>
														{item?.comment}
													</p>
													<CommentItem item={item} />
													{item?.comment_rep === null ? null : (
														<div className='bg-neutral-100 relative mt-3 px-3 py-3.5'>
															<h3 className='text-[#8b572a] text-sm capitalize'>
																Phản Hồi Của Người Bán
															</h3>
															<p className='text-[rgba(0,0,0,0.87)] whitespace-pre-wrap mt-2.5'>
																{item?.comment_rep?.comment}
															</p>
														</div>
													)}
													<div
														className='flex text-[rgba(0,0,0,0.4)] mt-[1.25rem] gap-[7px]'
														onClick={handleChangeStatus}>
														<i className={active}></i>
														<label>{number} Hữu Ích?</label>
													</div>
												</div>
											</div>
										)
									})
								) : (
									<div className='flex flex-col items-center px-0 py-[100px]'>
										<div className='w-full h-full flex justify-center'>
											<img src='/assets/Img/rating.png' alt='emptyComment'></img>
										</div>
										<p className='text-base text-[rgba(0,0,0,0.8)] mt-3'>Chưa Có Bình Luận Nào</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function CommentItem({ item }: any): JSX.Element {
	const [ShowImg, setShowImg] = useState(false)
	const [ShowVideo, setShowVideo] = useState(false)

	const [imgActive, setImgActive] = useState('')
	return (
		<div className='flex'>
			<div className='w-full'>
				<div className='flex'>
					{item?.cover && (
						<div
							className='w-[72px] h-[72px] relative mr-2.5 cursor-zoom-in p-[5px] hover:!border-2 hover:!border-solid hover:!border-[#ee4d2d]'
							onClick={() => {
								if (ShowImg) {
									setShowImg(false)
								}
								setShowVideo(true)
							}}
							onDoubleClick={() => setShowVideo(false)}>
							<i className='fa-solid fa-video  absolute text-[#fff] text-[0.938rem] w-full h-[32%] flex items-center pl-2.5 bottom-0 inset-x-0 bg-[rgba(0, 0, 0, 0.54)]'></i>
							<img src={item?.cover} alt='' className='w-full h-full' />
						</div>
					)}

					{item?.images?.map((img: any, index_img: any) => {
						return (
							<div
								className='w-[72px] h-[72px]  mr-2.5 cursor-zoom-in p-[5px] hover:!border-2 hover:!border-solid hover:!border-[#ee4d2d]'
								key={index_img}
								onClick={() => setImgActive(item?.images[index_img])}>
								<img
									src={img}
									alt='item'
									className='w-full h-full'
									onClick={() => {
										if (ShowVideo) {
											setShowVideo(false)
										}
										setShowImg(true)
									}}
									onDoubleClick={() => setShowImg(false)}
								/>
							</div>
						)
					})}
				</div>
				<div className='mt-[20px]'>
					{ShowVideo && (
						<div>
							<video src={item?.videos} controls autoPlay className='max-w-[100%]' />
						</div>
					)}
					{ShowImg && item?.images && (
						<div className='w-[500px]'>
							<img src={imgActive} alt='' className='w-full h-full' />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductCommentComponent
