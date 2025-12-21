import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export default function loginGoogleComponent(): JSX.Element {
	const { t } = useTranslation()

	return (
		<NavLink
			to={`${(import.meta as any).env.VITE_REACT_APP_API_HOST}/auth/google`}
			className='flex flex-row items-center justify-center bg-[rgb(255_255_255_/_1)] text-[rgb(102_102_102_/_1)] overflow-hidden text-ellipsis text-sm capitalize leading-[1.6rem] box-border h-[34px] px-1.5 py-0 rounded-sm border-0 hover:bg-[rgb(255_255_255_/_0.8)]'>
			<span className='flex flex-row items-center justify-center bg-[#fff] text-[rgb(102_102_102_/_1)] overflow-hidden text-ellipsis text-sm capitalize leading-[1.6rem] box-border h-[34px] no-underline px-1.5 py-0 rounded-sm border-0'>
				<i className='fa-brands fa-google'></i>
			</span>
			<span className='text-[0.9rem] px-[15px]'>{t('AUTH.LABEL.LOGIN_GOOGLE')}</span>
		</NavLink>
	)
}
