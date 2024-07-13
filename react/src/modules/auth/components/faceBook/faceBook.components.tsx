import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export default function loginFacebookComponent(): JSX.Element {
	const { t } = useTranslation()
	return (
		<NavLink
			to={`${(import.meta as any).env.VITE_REACT_APP_API_HOST}/auth/facebook`}
			className='box-border h-[34px] overflow-hidden text-ellipsis text-sm capitalize leading-[1.6rem] text-[#fff] no-underline bg-[rgb(58_90_152_/_1)] px-1.5 py-0 rounded-sm border-0 hover:bg-[rgb(58_90_152_/_0.8)] hover:text-[#fff] cursor-pointer'>
			<span className='text-lg leading-7'>
				<i className='fa-brands fa-facebook-square'></i>
			</span>
			<span className='text-[0.9rem] px-[15px]'>{t('AUTH.LABEL.LOGIN_FACEBOOK')}</span>
		</NavLink>
	)
}
