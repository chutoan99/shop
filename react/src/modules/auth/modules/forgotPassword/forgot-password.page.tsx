import { useState, memo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutationForgotPassWord } from '../../hooks'
import { LoadingDefaultComponent } from '../../../shared/loading'
import { validateForgotPassword } from '../../helpers'
import { LoginFaceBookComponent, LoginGoogleComponent } from '../../components'
import { ForgotPasswordDto } from '../../interfaces'

function ForgotPasswordPage(): JSX.Element {
	const { t } = useTranslation()
	const [emailLogin, setEmailLogin] = useState('')
	const [validationMsg, setValidationMsg] = useState<any>({})
	const [payload, setPayload] = useState<ForgotPasswordDto>({
		email: emailLogin
	})
	const { loading, refetch } = useMutationForgotPassWord(payload)

	useEffect(() => {
		setPayload(() => {
			return {
				email: emailLogin
			}
		})
	}, [emailLogin])

	const onSubmit = async () => {
		const isValid = await validateForgotPassword(emailLogin, setValidationMsg)
		if (!isValid) return
		refetch()
	}

	const handelKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			onSubmit()
		}
	}
	return (
		<>
			{loading && <LoadingDefaultComponent />}
			<div className='w-[500px] py-[1.25rem] bg-[#fff] box-border shadow-[0_3px_10px_0_rgba(0,0,0,0.14)] rounded overflow-hidden'>
				<div className='px-[2rem] py-0'>
					<div className='flex items-center justify-between mt-2.5 px-3 py-0'>
						<h3 className='text-[1.37rem] font-normal text-[#333]'> {t('AUTH.LABEL.LOGIN')}</h3>
						<NavLink
							to='/auth/register'
							className='cursor-pointer text-base leading-6 font-normal text-[#ee4d2d] hover:text-[#ee4d2d]'>
							{t('AUTH.LABEL.REGISTER')}
						</NavLink>
					</div>
					<div>
						<div>
							<input
								type='text'
								value={emailLogin}
								onKeyDown={handelKeyDown}
								onChange={(e) => setEmailLogin(e.target.value)}
								placeholder={t(`AUTH.PLACEHOLDER.EMAIL`)}
								className='w-full text-sm leading-10 mt-4 px-3 py-0 rounded-sm border-[#dbdbdb] border-[1px]  border-[solid] focus-visible:border-[0.5px] focus-visible:border-[rgb(136_136_136_/_0.5)] focus:border-[#dbdbdb]'
							/>
							<span className='text-[#ee4d2d] text-xs ml-[15px]'>{t(validationMsg.emailLogin)}</span>
						</div>
					</div>
					<div className='flex justify-end mt-[15px]'>
						<NavLink
							to='/auth/forgot-password'
							className='no-underline text-sm leading-5 text-[#ee4d2d] hover:text-[#ee4d2d]'>
							{t('AUTH.LABEL.FORGOT_PASSWORD')}
						</NavLink>
						<span className='mt-[-0.125rem] block h-[22px] mb-0 mx-4 border-l-[rgb(234_234_234_/_1)] border-l border-solid'></span>
						<NavLink
							to='# '
							className='text-sm leading-5 text-[rgb(147_147_147_/_1)] no-underline hover:text-[rgb(147_147_147_/_1)]'>
							{t('AUTH.LABEL.HELP')}
						</NavLink>
					</div>
					<div className='flex justify-end mt-[20px] gap-[10px]'>
						<NavLink
							to='/'
							className='overflow-hidden text-ellipsis flex-col text-sm box-border shadow-[0_1px_1px_0_rgba(0,0,0,0.09)] border flex items-center justify-center capitalize h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline px-3 py-0 rounded-sm border-solid border-[#ccc] hover:text-[unset]'>
							{t('AUTH.LABEL.RETURN')}
						</NavLink>
						<button
							className='overflow-hidden text-ellipsis flex-col text-sm box-border text-[#fff]  h-[34px] min-w-[124px] text-[0.9rem] leading-[1.6rem] no-underline flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.09)] px-2.5 py-0 rounded-sm border-0 bg-[#ee4d2d] hover:[text-[#fff]]'
							onClick={onSubmit}>
							{t('AUTH.LABEL.SUBMIT')}
						</button>
					</div>
				</div>
				<div className='flex justify-center gap-[0_20px] bg-neutral-100 mt-[22px] px-0 py-4'>
					<LoginFaceBookComponent />
					<LoginGoogleComponent />
				</div>
			</div>
		</>
	)
}
export default memo(ForgotPasswordPage)
