import { NavLink } from 'react-router-dom'
import { RootState } from '../../redux'
import { useAppSelector } from '../../hooks/hooks'
import { useTranslation } from 'react-i18next'

export default function UserSystemComponent(): JSX.Element {
	const { t } = useTranslation()
	const { data: dataUser } = useAppSelector((state: RootState) => state.user)
	return (
		<div className='col-lg-2'>
			<div>
				<div className=' max-w-sm mx-auto flex items-center space-x-4'>
					<div className='shrink-0'>
						<div className='rounded-[50%] bg-[#ccc]  opacity-0.5 h-12 w-12 overflow-hidden inline-block'>
							<img className=' rounded-full' src={dataUser.avatar} />
						</div>
					</div>
					<div>
						<div className='overflow-hidden text-ellipsis whitespace-nowrap min-h-[1rem] font-semibold text-[#333] mb-[7px]'>
							{dataUser.name}
						</div>
						<div className='text-[#888] capitalize no-underline flex'>
							<svg
								width={12}
								height={12}
								viewBox='0 0 12 12'
								xmlns='http://www.w3.org/2000/svg'
								style={{ marginRight: 4 }}>
								<path
									d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
									fill='#9B9B9B'
									fillRule='evenodd'
								/>
							</svg>
							{t(`USER_SYSTEM.LABEL.EDIT_ACCOUNT`)}
						</div>
					</div>
				</div>
			</div>
			<div className='flex gap-[15px]  flex-col mt-[30px]'>
				<NavLink to='/user/profile' className='relative hover:text-[#ee4d2d]'>
					<div className='text-right'>
						<div className='flex gap-[10px]'>
							<div className='flex items-center justify-center w-5 h-5 leading-5 text-center text-[#fff] shrink-0 mr-2.5 rounded-[50%]'>
								<img
									className='w-full h-full'
									src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
									alt='profile'
								/>
							</div>
							<div className='leading-4'>
								<span>{t(`USER_SYSTEM.LABEL.ACCOUNT`)}</span>
							</div>
						</div>
					</div>
				</NavLink>
				<NavLink to='/user/purchase' className='relative hover:text-[#ee4d2d]'>
					<div className='text-right'>
						<div className=' flex gap-[10px]'>
							<div className='flex items-center justify-center w-5 h-5 leading-5 text-center text-[#fff] shrink-0 mr-2.5 rounded-[50%]'>
								<img
									className='w-full h-full'
									src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
									alt='purchase'
								/>
							</div>
							<div className='leading-4'>
								<span>{t(`USER_SYSTEM.LABEL.PURCHASE`)}</span>
							</div>
						</div>
					</div>
					<div className='stardust-dropdown__item-body stardust-dropdown__item-body--open'>
						<div className='Yu7gVR' />
					</div>
				</NavLink>
				<NavLink to='/user/notify' className='relative hover:text-[#ee4d2d]'>
					<div className='text-right'>
						<div className=' flex gap-[10px]'>
							<div className='flex items-center justify-center w-5 h-5 leading-5 text-center text-[#fff] shrink-0 mr-2.5 rounded-[50%]'>
								<img
									className='w-full h-full'
									src='https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c'
									alt='notification'
								/>
							</div>
							<div className='leading-4'>
								<span>{t(`USER_SYSTEM.LABEL.NOTIFY`)}</span>
							</div>
						</div>
					</div>
				</NavLink>
				<NavLink to='/user/voucher' className='relative hover:text-[#ee4d2d]'>
					<div className='text-right'>
						<div className=' flex gap-[10px]'>
							<div className='flex items-center justify-center w-5 h-5 leading-5 text-center text-[#fff] shrink-0 mr-2.5 rounded-[50%]'>
								<img
									className='w-full h-full'
									src='https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748'
									alt='voucher'
								/>
							</div>
							<div className='leading-4'>
								<span>{t(`USER_SYSTEM.LABEL.VOUCHER`)}</span>
							</div>
						</div>
					</div>
				</NavLink>
			</div>
		</div>
	)
}
