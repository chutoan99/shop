import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export default function SortBarsComponent(): JSX.Element {
	const { t } = useTranslation()
	return (
		<ul
			className='h-[46px] bg-[#fff] flex border border-neutral-200 m-0 pl-0 border-solid mb-[1rem]'
			style={{ display: 'flex' }}>
			<li className='flex-1'>
				<NavLink
					to='#'
					className='no-underline text-sm text-[#333] block h-full leading-[46px] text-center relative hover:text-[#ee4d2d]'>
					{t`CATEGORY.LABEL.RELATE`}
				</NavLink>
			</li>
			<li className='flex-1'>
				<NavLink
					to='#'
					className="no-underline text-sm text-[#333] block h-full leading-[46px] text-center relative before:content-[''] before:absolute before:-translate-y-2/4 before:h-3/5 before:border-l-[none] before:left-0  before:top-2/4 before:border-l-neutral-200 before:border-l before:border-solid text-[text-[#ee4d2d] hover:text-[#ee4d2d]">
					{t`CATEGORY.LABEL.LATEST`}
				</NavLink>
			</li>
			<li className='flex-1'>
				<NavLink
					to='#'
					className="no-underline text-sm text-[#333] block h-full leading-[46px] text-center relative before:content-[''] before:absolute before:-translate-y-2/4 before:h-3/5 before:border-l-[none] before:left-0  before:top-2/4 before:border-l-neutral-200 before:border-l before:border-solid hover:text-[#ee4d2d]">
					{t`CATEGORY.LABEL.SELLING`}
				</NavLink>
			</li>
			<li className='flex-1'>
				<NavLink
					to='#'
					className="no-underline text-sm text-[#333] block h-full leading-[46px] text-center relative before:content-[''] before:absolute before:-translate-y-2/4 before:h-3/5 before:border-l-[none] before:left-0  before:top-2/4 before:border-l-neutral-200 before:border-l before:border-solid hover:text-[#ee4d2d]">
					{t`CATEGORY.LABEL.PRICE`}
				</NavLink>
			</li>
		</ul>
	)
}
