import axios from 'axios'
import toast from 'react-hot-toast'
import { EnvConfig } from './env.config'

const instance = axios.create({
	baseURL: EnvConfig.baseUrl
})

instance.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		if (error.response.status === 401) {
			setTimeout(() => {
				window.location.href = '/auth/login'
			}, 3000)
		}
		if (error.response && error.response.status === 500 && error.err === -1) {
			toast.error(error.mes.toString())
		}
		if (error.response && error.response.status === 404 && error.err === -1) {
			toast.error(error.mes.toString())
		}
		return Promise.reject(error)
	}
)
export default instance
