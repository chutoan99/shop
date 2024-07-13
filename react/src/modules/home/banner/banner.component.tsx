import Slider from 'react-slick'
import { memo } from 'react'
import { useGetBannerQuery } from './hooks'
import { bannerConfig } from './configs'
import { BannerModel } from './interfaces'

function BannerComponent(): JSX.Element {
	const { data, isLoading } = useGetBannerQuery()

	return (
		<>
			{!isLoading && (
				<>
					<div className='col l-8 mo-8 c-8' id='carousel'>
						<Slider {...bannerConfig.settings}>
							{data?.response?.map((listItem: BannerModel) => {
								return (
									<div className='w-full h-full' key={listItem.id}>
										<img src={listItem?.image_url} alt='Slider' className='w-full h-full' />
									</div>
								)
							})}
						</Slider>
					</div>
					<div className='col l-4 m-0-4 c-4'>
						<div>
							{data?.response?.map((item: BannerModel, index: number) => {
								return (
									index > data?.response?.length - 3 && (
										<div className='mb-[5px]' key={item.id}>
											<img src={item.image_url} alt='Carousel09' className='w-full h-[96%]' />
										</div>
									)
								)
							})}
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default memo(BannerComponent)
