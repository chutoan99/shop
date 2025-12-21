export const EnvConfig = {
	baseUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST}`,
	chatUrl: `${(import.meta as any).env.VITE_REACT_APP_API_HOST_CHAT}`
}
