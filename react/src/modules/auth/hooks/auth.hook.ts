import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ApiForgotPassword, ApiLogin, ApiRegister, ApiResetPassword } from '../services'
import {
	ForgotPasswordDto,
	LoginResponse,
	RegisterResponse,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from '../interfaces'

export const useMutationLogin = (payload: LoginDto) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)

	const onRefetch = async () => {
		try {
			setLoading(true)
			const response: LoginResponse = await ApiLogin(payload)
			if (response.err === 0) {
				toast.success(t(`AUTH.MESSAGE.LOGIN_SUCCESS`))
				localStorage.setItem('token-shopee', response?.access_token ?? '')
				setTimeout(() => {
					navigate('/')
				}, 2000)
			} else {
				toast.error(response.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setLoading(false)
		}
	}

	const refetch = () => {
		onRefetch()
	}

	return { loading, refetch }
}

export const useMutationRegister = (payload: RegisterDto) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)

	const onRefetch = async () => {
		try {
			setLoading(true)
			const response: RegisterResponse = await ApiRegister(payload)
			if (response.err === 0) {
				toast.success(t(`AUTH.MESSAGE.REGISTER_SUCCESS`))
				setTimeout(() => {
					navigate('/auth/login')
				}, 2000)
			} else {
				toast.error(response.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setLoading(false)
		}
	}

	const refetch = () => {
		onRefetch()
	}

	return { loading, refetch }
}

export const useMutationForgotPassWord = (payload: ForgotPasswordDto) => {
	const [loading, setLoading] = useState(false)
	const { t } = useTranslation()
	const onRefetch = async () => {
		try {
			setLoading(true)
			const response = await ApiForgotPassword(payload)
			if (response.err === 0) {
				toast.success(t(`AUTH.MESSAGE.FORGOT_PASSWORD_SUCCESS`))
			} else {
				toast.error(response.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setLoading(false)
		}
	}

	const refetch = () => {
		onRefetch()
	}

	return { loading, refetch }
}

export const useMutationResetPassWord = (payload: ResetPasswordDto) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const onRefetch = async () => {
		try {
			setLoading(true)
			const data = await ApiResetPassword(payload)
			if (data.err === 0) {
				toast.success(t(`AUTH.MESSAGE.RESET_PASSWORD_SUCCESS`))
				setTimeout(() => {
					navigate('/auth/login')
				}, 2000)
			} else {
				toast.error(data.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setLoading(false)
		}
	}

	const refetch = () => {
		onRefetch()
	}

	return { loading, refetch }
}
