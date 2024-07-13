import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UserActions } from '../redux'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../modules/user-system/modules/account/services'
import { UserModel } from '../modules/user-system/modules/account/interfaces'

export default function useAuth() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const token = localStorage.getItem('token-shopee')
	const [dataUser, setDataUser] = useState<UserModel>()

	useEffect(() => {
		const fetchDataCurrentUser = async () => {
			if (token) {
				try {
					const response = await GetCurrentUser()
					if (response.err === 0) {
						setDataUser(response.response)
						dispatch(
							UserActions.updateUser({
								data: response.response,
								isLogin: true
							})
						)
					} else {
						toast.error(response.msg)
					}
				} catch (error: any) {}
			} else {
				setTimeout(() => {
					navigate('/auth/login')
				}, 1000)
			}
		}

		fetchDataCurrentUser()
	}, [token, dispatch, navigate])

	return { dataUser }
}
