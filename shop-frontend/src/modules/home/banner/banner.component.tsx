import Slider from 'react-slick'
import { memo } from 'react'
import { bannerConfig } from './configs'
import { BannerModel, IBannerModel } from '@models/banner.model'
import { useGetBannerQuery } from '@hooks/apis/banner.hook'

function BannerComponent(): JSX.Element {
	const { data, isLoading } = useGetBannerQuery()

	return (
		<>
			{!isLoading && (
				<>
					<div className='col l-8 mo-8 c-8' id='carousel'>
						<Slider {...bannerConfig.settings}>
							{data?.map((listItem: IBannerModel) => {
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
							{data?.map((item: BannerModel, index: number) => {
								return (
									index > data?.length - 3 && (
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
