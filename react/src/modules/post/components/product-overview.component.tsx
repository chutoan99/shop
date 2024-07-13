import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductDetailModel } from '../interfaces'

type ProductOverviewProps = {
	data: ProductDetailModel
}

function ProductOverviewComponent({ data }: ProductOverviewProps): JSX.Element {
	return (
		<div className='bg-[#f5f5f5] overflow-hidden py-[12px]'>
			<div className='grid wide'>
				<div className='row gap-[-20px]'>
					<div className='col-lg-10'>
						<div className='bg-[#fff] overflow-hidden mt-[0.9375rem] p-2.5 rounded-sm'>
							<div className='pt-[0.9375rem] pb-0 px-[0.9375rem]'>
								<div
									className='pl-[10px] text-[rgba(0,0,0,0.87)] text-lg capitalize p-3.5;'
									style={{
										background: 'rgba(0, 0, 0, 0.02)'
									}}>
									CHI TIẾT SẢN PHẨM
								</div>
								<div className='mt-[1.875rem] mb-[0.9375rem] mx-[0.9375rem]'>
									<div className='flex mb-[1.125rem]'>
										<label className='text-[rgba(0,0,0,0.4)] text-sm box-border w-[8.75rem] text-ellipsis overflow-hidden whitespace-nowrap pr-3'>
											Danh Mục
										</label>
										<div className='flex flex-wrap'>
											<div>
												<span className='mr-[5px]'>
													<NavLink
														className='hover:text-[unset]'
														to={`/categories/${data?.category?.category_name}/${data?.category?.id}`}>
														{data?.category?.category_name}
													</NavLink>
												</span>
											</div>
										</div>
									</div>
									{/* <div>
											{!isEmptyObject(data?.attributes) && (
												<>
													{data.attributes?.option.map((attribute: any, index: any) => (
														<div className='flex mb-[1.125rem]' key={index}>
															<label className='text-[rgba(0,0,0,0.4)] text-sm box-border w-[8.75rem] text-ellipsis overflow-hidden whitespace-nowrap pr-3'>
																{attribute.name}
															</label>
															<div>{attribute.value}</div>
														</div>
													))}
												</>
											)}
										</div> */}
								</div>
								{data?.description && (
									<div>
										<div
											className='text-[rgba(0,0,0,0.87)] text-lg capitalize p-3.5'
											style={{
												background: 'rgba(0, 0, 0, 0.02)'
											}}>
											MÔ TẢ SẢN PHẨM
										</div>
										<div className='whitespace-pre-wrap text-[rgba(0,0,0,0.8)] text-sm overflow-hidden text-ellipsis leading-[1.7rem]'>
											<p className='mt-[1.875rem] mb-[0.9375rem] mx-[0.9375rem]'>
												{data?.description}
											</p>
										</div>
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
export default memo(ProductOverviewComponent)
