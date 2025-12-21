import LoadingSkeletonComponent from './loading-skeleton.components'

export default function SkeletonProductComponent({ isLoading }: { isLoading: boolean }): JSX.Element {
	return (
		<>
			{isLoading && (
				<div className='mb-[10px]'>
					<div className='row sm-gutter'>
						{Array(48)
							.fill(0)
							.map((_, index: number) => (
								<div className='col l-2 mo-4 c-6' key={index}>
									<div className='relative shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-[linear] delay-[0.1s] mt-[5px] pb-[5px] rounded-sm bg-[#fff]'>
										<div
											className='cursor-pointer bg-[top_center] bg-contain bg-no-repeat rounded-br-sm rounded-bl-sm w-full'
											style={{ height: '191px' }}>
											<LoadingSkeletonComponent className='mb-[5px] w-full cursor-pointer bg-[top_center] bg-contain bg-no-repeat rounded-br-sm rounded-bl-sm h-full'></LoadingSkeletonComponent>
										</div>
										<div className='text-sm h-9 ml-1.5 mr-2.5 my-2.5' style={{ height: '36px' }}>
											<LoadingSkeletonComponent className='w-full mb-1 h-9  ml-1.5 mr-2.5 my-2.5'></LoadingSkeletonComponent>
										</div>
										<div
											className='text-sm h-9 ml-1.5 mr-2.5 my-2.5'
											style={{
												height: '36px',
												marginTop: 'unset'
											}}>
											<LoadingSkeletonComponent className='w-full mb-1 h-9 ml-1.5 mr-2.5 my-2.5'></LoadingSkeletonComponent>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</>
	)
}
