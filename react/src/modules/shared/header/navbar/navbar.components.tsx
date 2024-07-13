import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { HeaderNotifyComponent } from '../notify'
import { useGetNotifyQuery } from '../notify/hooks'
import { AppDispatch, RootState, UserActions } from '../../../../redux'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { ApiLogout } from '../../../auth/services'
import { LoadingDefaultComponent } from '../../loading'

function NavbarComponent(): JSX.Element {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch: AppDispatch = useAppDispatch()
	const [totalNotify, setTotalNotify] = useState<number>(0)
	const { data: dataUser, isLogin } = useAppSelector((state: RootState) => state.user)
	const { data: dataNotify, isLoading: isLoadingNotification } = useGetNotifyQuery()
	const [loading, setLoading] = useState<Boolean>(false)

	useEffect(() => {
		setTotalNotify(dataNotify?.response?.length || 0)
	}, [dataNotify])

	const handleOpenNewTab = () => {
		window.open('https://shopee-admin.vercel.app', '_blank')
	}

	const onLogout = async () => {
		setLoading(true)
		try {
			const response = await ApiLogout()
			if (response.err === 0) {
				toast.success(t(`AUTH.MESSAGE.LOGOUT_SUCCESS`))
				localStorage.remove('token-shopee')
				window.location.reload()
			} else {
				toast.error(response.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setLoading(false)
			setTimeout(() => {
				navigate('./auth/login')
			}, 2000)
			dispatch(UserActions.updateUser({ data: null, isLogin: false }))
		}
	}
	return (
		<>
			{loading && <LoadingDefaultComponent />}
			<nav className='flex justify-between'>
				<ul className='flex justify-items-center mt-1 mb-0 mx-0 pl-0'>
					<li className='group relative min-h-[26px] no-underline text-sm text-[#fff] font-light items-center flex cursor-pointer mx-2 my-0'>
						<span className='hover:text-[rgba(255,255,255,0.7)]' onClick={handleOpenNewTab}>
							{t`HEADER.NAVBAR.LABEL.SELLER`}
						</span>
						<div className="group-hover:block hidden w-[186px] bg-[#fff] absolute animate-[fadeIn_ease-in_0.3s] z-[2] shadow-[0_1px_2px_rgb(0,0,0,0.1)] p-2 rounded-sm left-0 top-[120%] before:content-[''] before:absolute before:w-full before:h-5 before:block before:z-[2] before:left-0 before:-top-4">
							<img className='w-full h-full' src='assets/Img/qr-code.png' alt='' />
							<div className='flex justify-between'>
								<div className='ml-[15px]'>
									<img className='h-[15px]' src='/assets/Img/gg-play.png' alt='' />
								</div>
								<div className='mr-[11px]'>
									<img className='h-[15px]' src='/assets/Img/app-store.png' alt='' />
								</div>
							</div>
						</div>
					</li>
					<li className='relative min-h-[26px] no-underline text-sm font-light text-[#fff] items-center flex mx-2 my-0'>
						<span className='hover:text-[rgba(255,255,255,0.7)]'>{t`HEADER.NAVBAR.LABEL.CONNECT`}</span>
						<NavLink to='#' className='items-center flex text-[#fff] no-underline hover:text-[unset]'>
							<span className='text-lg mx-1 my-0'>
								<i className='fa-brands fa-facebook-square'></i>
							</span>
						</NavLink>
						<NavLink to='#' className='items-center flex text-[#fff] no-underline hover:text-[unset]'>
							<span className='text-lg mx-1 my-0'>
								<i className='fa-brands fa-instagram-square'></i>
							</span>
						</NavLink>
					</li>
				</ul>
				<ul className='flex justify-items-center mt-1 mb-0 mx-0 pl-0'>
					<li className='group relative min-h-[26px] mx-2 my-0'>
						<NavLink
							to='# '
							className='no-underline text-sm font-light text-[#fff] items-center flex hover:text-[rgba(255,255,255,0.7)]'>
							<div className='text-[#fff] no-underline items-center flex '>
								<span className='text-lg mx-1 my-0'>
									<i className='far fa-bell'></i>
								</span>
							</div>
							<span className='text-[0.625rem] absolute leading-[0.875rem] text-[#ee4d2d] bg-[#fff] px-[7px] py-px rounded-[10px] border-2 border-solid border-[#ee4d2d] right-[58px] -top-px'>
								{totalNotify}
							</span>
							{t`HEADER.NAVBAR.LABEL.NOTIFY`}
						</NavLink>
						{!isLoadingNotification && <HeaderNotifyComponent data={dataNotify?.response || []} />}
					</li>
					<li className='relative min-h-[26px] no-underline text-sm font-light text-[#fff] items-center flex mx-2 my-0'>
						<NavLink
							to='#'
							className='no-underline text-sm font-light text-[#fff] items-center flex hover:text-[rgba(255,255,255,0.7)]'>
							<div className='text-[#fff] no-underline items-center flex'>
								<span className='text-lg mx-1 my-0'>
									<i className='fa-solid fa-circle-question'></i>
								</span>
							</div>
							{t`HEADER.NAVBAR.LABEL.HELP`}
						</NavLink>
					</li>
					{isLogin ? (
						<li className='group no-underline text-sm font-light text-[#fff] min-h-[26px] justify-items-center relative items-center flex mx-2 my-0'>
							<img
								src={dataUser?.avatar}
								alt={dataUser?.name}
								className='text-sm font-light text-[#fff] w-[22px] h-[22px] border rounded-[50%] border-solid border-[rgb(0,0,0,0.2)]'
							/>
							<span className='text-sm font-normal text-[#fff] ml-1 group-hover:text-[rgba(255,255,255,0.7)]'>
								{dataUser?.name}
							</span>
							<ul className="group-hover:block hidden absolute z-[2] bg-[#fff] w-40 shadow-[0_1px_5px_rgba(189,189,189)]  pl-0 rounded-sm right-0 top-[calc(100%_+_6px)] after:content-[''] after:top-[-29px] after:absolute after:z-[-1] after:border-solid after:!border-x-[30px] after:!border-y-[20px]  after:border-[transparent_transparent_#fff_transparent] after:right-1 before:content-[''] before:block before:absolute before:w-[68%] before:h-2 before:right-0 before:-top-2">
								<li className='hover:bg-[#fafafa]'>
									<NavLink to='/user/profile'>
										<span className='no-underline text-[#333] text-[0.875rem] block !pl-4 py-2 hover:text-[#26aa99]'>
											{t`HEADER.NAVBAR.LABEL.ACCOUNT`}
										</span>
									</NavLink>
								</li>
								<li
									className='hover:bg-[#fafafa]'
									style={{
										borderTop: 'solid 1px rgb(0, 0, 0, 0.05)'
									}}>
									<NavLink to='/user/purchase'>
										<span className='no-underline text-[#333] text-[0.875rem] block !pl-4 py-2 hover:text-[#26aa99]'>
											{t`HEADER.NAVBAR.LABEL.PURCHASE`}
										</span>
									</NavLink>
								</li>
								<li
									className='hover:bg-[#fafafa]'
									style={{
										borderTop: 'solid 1px rgb(0, 0, 0, 0.05)'
									}}>
									<span
										onClick={onLogout}
										className='no-underline text-[#333] text-[0.875rem] block !pl-4 py-2 hover:text-[#26aa99]'>
										{t`HEADER.NAVBAR.LABEL.LOGOUT`}
									</span>
								</li>
							</ul>
						</li>
					) : (
						<>
							<div>
								<li className="hover:text-[rgba(255,255,255,0.7)] no-underline text-sm font-light text-[#fff] relative min-h-[26px] items-center flex mx-2 my-0  after:content-[''] after:absolute after:h-3 after:-translate-y-2/4 after:border-l-[#fb9086] after:border-l after:border-solid after:-right-2.5 after:top-2/4">
									<NavLink
										to='/auth/register'
										className='no-underline text-sm text-[#fff] items-center flex font-normal leading-[2.125rem] hover:text-[rgba(255,255,255,0.7)]'>
										{t`HEADER.NAVBAR.LABEL.REGISTER`}
									</NavLink>
								</li>
							</div>
							<div>
								<li className='hover:text-[rgba(255,255,255,0.7)] no-underline text-sm font-light text-[#fff] relative min-h-[26px] items-center flex mx-2 my-0'>
									<NavLink
										to='/auth/login'
										className=' no-underline text-sm text-[#fff] items-center flex font-normal leading-[2.125rem] hover:text-[rgba(255,255,255,0.7)]'>
										{t`HEADER.NAVBAR.LABEL.LOGIN`}
									</NavLink>
								</li>
							</div>
						</>
					)}
				</ul>
			</nav>
		</>
	)
}
export default memo(NavbarComponent)
