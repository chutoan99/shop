import { Toaster } from 'react-hot-toast'
import { FooterComponent, ChatComponent, HeaderComponent, HeartComponent } from '../../modules/shared'
import { ReactNode } from 'react'
import useAuth from '../../hooks/userAuth'

type DefaultLayoutProps = {
	children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
	useAuth()
	return (
		<div className='overflow-hidden'>
			<Toaster position='top-right' reverseOrder={false} />
			<HeartComponent />
			<HeaderComponent />
			{children}
			<ChatComponent />
			<FooterComponent />
		</div>
	)
}
