import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { FooterComponent, ChatComponent, HeaderComponent, HeartComponent } from '@modules/shared'
import useAuth from '@hooks/userAuth'

type SearchLayoutProps = {
	children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps): JSX.Element {
	useAuth()
	return (
		<>
			<Toaster position='top-right' reverseOrder={false} />
			<HeartComponent />
			<HeaderComponent />
			<div className='mt-[120px]'>
				<div className='bg-[#f5f5f5] overflow-hidden py-[24px]'>
					<div className='grid wide'>{children}</div>
				</div>
			</div>
			<ChatComponent />
			<FooterComponent />
		</>
	)
}
