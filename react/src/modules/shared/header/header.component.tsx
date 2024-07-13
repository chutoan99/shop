import { memo } from 'react'
import { NavbarComponent } from './navbar'
import SearchHistoryComponent from './searchHistory/search-history.component'

function HeaderComponent(): JSX.Element {
	return (
		<header className='h-[120px] bg-[linear-gradient(0,#fe6433,#f53e2d)] fixed z-10 top-0 inset-x-0'>
			<div className='grid wide flex-col justify-between h-full' style={{ display: 'flex' }}>
				<NavbarComponent />
				<SearchHistoryComponent />
			</div>
		</header>
	)
}
export default memo(HeaderComponent)
