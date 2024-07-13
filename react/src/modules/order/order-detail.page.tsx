import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { formatPrice } from '../../utils/formatPrice'
import { useGetOrderQuery } from '../../modules/order/hooks'
import { ModelRattingComponent } from '../../modules/comment/components'
import { LoadingDefaultComponent } from '../../modules/shared/loading'
import { StatusOrderComponent, ListsOrderComponent } from '../../modules/order/components'
import { useToggle } from '../../hooks'

function OrderDetailPage(): JSX.Element {
	const params = useParams()
	const { data: dataOrder, isLoading } = useGetOrderQuery(Number(params.orderid))
	const [value, toggle] = useToggle(false)
	return (
		<>
			{isLoading && <LoadingDefaultComponent />}
			{dataOrder?.response && (
				<div className='col-lg-10 bg-[#fff] pl-0 pr-0'>
					<div className='bg-[#fff] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] rounded-sm'>
						<StatusOrderComponent data={dataOrder.response} onShow={toggle} />
						<ListsOrderComponent data={dataOrder.response} />

						<div className='bg-neutral-50 border-t-[rgba(0,0,0,0.09)] border-t border-solid'>
							<div className='flex justify-end items-center text-right px-6 py-0 border-b-[rgba(0,0,0,0.09)] border-b border-dotted'>
								<div className='text-[rgba(0,0,0,0.54)] text-xs px-2.5 py-[13px]'>
									<span>Tổng tiền hàng</span>
								</div>
								<div className='w-60 text-[rgba(0,0,0,0.8)] pl-2.5 pr-0 py-[13px] border-l-[rgba(0,0,0,0.09)] border-l border-dotted'>
									{dataOrder?.response?.final_total && (
										<div> đ{formatPrice(dataOrder?.response?.final_total - 30000, 1)}</div>
									)}
								</div>
							</div>
							<div className='flex justify-end items-center text-right px-6 py-0 border-b-[rgba(0,0,0,0.09)] border-b border-dotted'>
								<div className='text-[rgba(0,0,0,0.54)] text-xs px-2.5 py-[13px]'>
									<span>Phí vận chuyển</span>
								</div>
								<div className='w-60 text-[rgba(0,0,0,0.8)] pl-2.5 pr-0 py-[13px] border-l-[rgba(0,0,0,0.09)] border-l border-dotted'>
									<div>₫{formatPrice(30000, 1)}</div>
								</div>
							</div>
							<div className='text-right flex justify-end items-start px-6 py-0 border-0'>
								<div className='text-[rgba(0,0,0,0.54)] text-xs px-2.5 py-[13px]'>
									<span>Thành tiền</span>
								</div>
								<div className='w-60 text-[rgba(0,0,0,0.8)] pl-2.5 pr-0 py-[13px] border-l-[rgba(0,0,0,0.09)] border-l border-dotted'>
									{dataOrder?.response?.final_total && (
										<div className='text-[#ee4d2d] text-2xl'>
											₫{formatPrice(dataOrder?.response.final_total)}
										</div>
									)}
								</div>
							</div>
						</div>
						{dataOrder?.response?.final_total && (
							<div className='flex items-center border shadow-[0_1px_1px_rgba(0,0,0,0.05)] mt-0 mb-1.5 mx-0 px-[23px] py-3 rounded-sm border-solid border-[rgba(224,168,0,0.4)] bg-[#fffefb]'>
								<svg
									height={16}
									width={16}
									viewBox='0 0 16 16'
									className='inline-block w-[1em] h-[1em] fill-current relative _5Fq+5W text-[#ffbf00]'>
									<g fillRule='evenodd'>
										<path
											d='m8 15c-3.8596721 0-7-3.1397891-7-6.9994612 0-3.8602109 3.1403279-7.0005388 7-7.0005388 3.8602109 0 7 3.1403279 7 7.0005388 0 3.8596721-3.1397891 6.9994612-7 6.9994612z'
											fill='none'
											strokeWidth={1}
											stroke='currentColor'
										/>
										<path
											d='m10.4132188 9.3999583h-5.050999c-.204396 0-.3841766-.1081321-.4918691-.297583-.0404396-.0712089-.1556047-.3239567.0413188-.6303309.0694507-.1248354.1643959-.2835171.2738467-.4593416.1050552-.1701102.1969235-.3371435.2791214-.5112098.086154-.1789015.1617586-.3705502.2259345-.5709901.0553847-.1771432.0839562-.3674733.0839562-.5652758 0-.2738467.0404396-.5287923.1204398-.7556059.075165-.2197807.1797806-.4193415.3098907-.5934078.125275-.1674729.2747258-.3151655.4457152-.4382426.1397805-.0989013.2826379-.1775828.4276932-.2369235.6247463-.29029 1.6628604-.0523078 1.6487945.0083517.1424179.0589012.2707698.1279123.3890118.2096707.1767036.1217585.333627.2747258.4646163.4540668.1283519.1784619.2312092.3810997.3050556.6013199.0760441.2232971.1147255.4738471.1147255.7437377 0 .1912092.0281319.3802205.0848353.5626385.0637364.2052751.1397805.3995612.2268136.5780231.0887914.1850553.1832971.3542864.2821984.5050559.1046156.1604399.1982421.297583.2826379.4123085.0874727.1160442.1296706.2505499.122198.3876931-.0061539.1107695-.0404396.2162642-.0989013.3041764-.0562639.0870331-.1305497.1591212-.2101103.2026378-.0685716.0404396-.1665937.0892309-.2769236.0892309zm-3.9906114.7572683h3.0423323c-.1878895.8170573-.6949449 1.2255859-1.5211662 1.2255859s-1.3332766-.4085286-1.5211662-1.2255859z'
											stroke='none'
											fill='currentColor'
										/>
									</g>
								</svg>
								<div className='flex-1 text-xs leading-[14px] text-[rgba(0,0,0,0.54)] pl-2 pr-0 py-0'>
									<span>
										Vui lòng thanh toán{' '}
										<span className='font-medium text-[#ee4d2d]'>
											₫{formatPrice(dataOrder?.response?.final_total + 30000)}
										</span>{' '}
										khi nhận hàng.
									</span>
								</div>
							</div>
						)}
						<div className='bg-[#fafafa]'>
							<div>
								<div> </div>
								<div> </div>
							</div>
							<div className='flex justify-end items-center text-right px-6 py-0'>
								<div className='text-[rgba(0,0,0,0.54)] text-xs px-2.5 py-[13px]'>
									<span className='flex gap-[5px] items-center'>
										<span className='cursor-pointer flex items-center'>
											<span className='align-middle'>
												<svg
													width={16}
													height={17}
													viewBox='0 0 253 263'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z'
														fill='#ee4d2d'
													/>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z'
														fill='#fff'
													/>
												</svg>
											</span>
										</span>
										<span className='align-middle'>Phương thức Thanh toán</span>
									</span>
								</div>
								<div className='w-60 text-[rgba(0,0,0,0.8)] pl-2.5 pr-0 py-[13px] border-l-[rgba(0,0,0,0.09)] border-l border-dotted'>
									<div>Thanh toán khi nhận hàng</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{dataOrder && <ModelRattingComponent isShow={value} onClose={toggle} data={dataOrder?.response} />}
		</>
	)
}
export default memo(OrderDetailPage)
