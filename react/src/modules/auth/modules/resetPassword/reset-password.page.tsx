import { useState, memo, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutationResetPassWord } from '../../hooks'
import { LoadingDefaultComponent } from '../../../shared/loading'
import { validateResetPassword } from '../../helpers'
import { LoginFaceBookComponent, LoginGoogleComponent } from '../../components'
import { ResetPasswordDto } from '../../interfaces'

function ResetPassWordPage(): JSX.Element {
	const params = useParams()
	const { t } = useTranslation()
	const [passWord, SetPassWord] = useState('')
	const [validationMsg, setValidationMsg] = useState<any>({})
	const [payload, setPayload] = useState<ResetPasswordDto>({
		email: params.email || '',
		token: params.token || '',
		password: passWord
	})

	const { loading, refetch } = useMutationResetPassWord(payload)

	useEffect(() => {
		setPayload(() => {
			return {
				token: params.token || '',
				email: params.email || '',
				password: passWord
			}
		})
	}, [params, passWord])

	const onResetPassWord = async () => {
		const isValid = await validateResetPassword(passWord, setValidationMsg)
		if (!isValid) return
		refetch()
	}
	const handelKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			onResetPassWord()
		}
	}
	return (
		<>
			{loading && <LoadingDefaultComponent />}
			<div className='w-[500px] py-[1.25rem] bg-[#fff] box-border shadow-[0_3px_10px_0_rgba(0,0,0,0.14)] rounded overflow-hidden'>
				<div className='px-[2rem] py-0'>
					<div className='flex items-center justify-between mt-2.5 px-3 py-0'>
						<h3 className='text-[1.37rem] font-normal text-[#333]'>{t('AUTH.LABEL.LOGIN')}</h3>
						<NavLink
							to='/auth/register'
							className='cursor-pointer text-base leading-6 font-normal text-[#ee4d2d] hover:text-[#ee4d2d]'>
							{t('AUTH.LABEL.REGISTER')}
						</NavLink>
					</div>
					<div>
						<div>
							<input
								type='password'
								value={passWord}
								onKeyDown={handelKeyDown}
								onChange={(e) => SetPassWord(e.target.value)}
								placeholder={t(`AUTH.PLACEHOLDER.NEW_PASSWORD`)}
								className='w-full  text-sm leading-10 mt-4 px-3 py-0 rounded-sm border-[#dbdbdb] border-[1px]  border-[solid] focus-visible:border-[0.5px] focus-visible:border-[rgb(136_136_136_/_0.5)] focus:border-[#dbdbdb]'
							/>
							<span className='text-[#ee4d2d] text-xs ml-[15px]'>{t(validationMsg.passWord)}</span>
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
							onClick={onResetPassWord}>
							{t('AUTH.LABEL.UPDATE')}
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
export default memo(ResetPassWordPage)
