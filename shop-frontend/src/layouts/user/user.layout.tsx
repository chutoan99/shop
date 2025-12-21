import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { FooterComponent, HeaderComponent } from '@modules/shared'
import { UserSystemComponent } from '@modules/user-system'
import useAuth from '@hooks/userAuth'

type UserLayoutProps = {
	children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps): JSX.Element {
	useAuth()
	return (
		<>
			<Toaster position='top-right' reverseOrder={false} />
			<HeaderComponent />
			<div className='bg-[#f5f5f5]'>
				<div className='grid wide'>
					<div className='row pt-[150px] pb-[30px] '>
						<UserSystemComponent />
						{children}
					</div>
				</div>
			</div>
			<FooterComponent />
		</>
	)
}
