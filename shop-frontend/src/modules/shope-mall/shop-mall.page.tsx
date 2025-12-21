import { memo } from 'react'

function ShopeMallPage(): JSX.Element {
	return (
		<div className='bg-[#f5f5f5] overflow-hidden mt-[120px]'>
			<div className='grid wide'>
				<div className='row sm-gutter'>
					<div className='w-full h-full my-[50px]'>
						<img
							src='https://cf.shopee.vn/file/vn-50009109-41871528899b70ddd5fd92d6c985e54b'
							alt=''
							className='w-[100%] h-[100%]'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(ShopeMallPage)
