import { useState, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useCreateHistorySearchMutation, useGetHistorySearchQuery } from './hooks'
import { useGetSearchSuggestQuery } from '../searchSuggest/hooks'
import LogoComponent from '../logo/logo.components'
import { SuggestListComponent } from '../searchSuggest'
import HeaderCartComponent from '../cart/cart.components'
import { useGetCartsQuery } from '../../../cart/hooks'
import { SearchHistoryModel } from './interfaces/search-history.model'

function HeaderSearchHistoryComponent(): JSX.Element {
	const { search } = useParams()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const {
		data: dataHistorySearch,
		isLoading: isLoadingHistorySearch,
		refetch: refetchHistorySearch
	} = useGetHistorySearchQuery()
	const { data: dataCart, isLoading: isLoadingDataCart } = useGetCartsQuery()
	const { data: dataSearchSuggestion, isLoading: isLoadingSearchSuggestion } = useGetSearchSuggestQuery()
	const [createHistorySearch] = useCreateHistorySearchMutation()
	const [showHistory, setShowHistory] = useState<boolean>(false)
	const [payload, setPayload] = useState({
		text: search
	})

	const onSearch = async () => {
		if (payload.text === '') return
		await createHistorySearch(payload).unwrap()
		refetchHistorySearch()
		navigate(`/search/${payload.text}`)
	}

	const handleKeyDown = (e: any) => {
		if (payload.text === '') return
		if (e.code === 'Enter') {
			onSearch()
		}
	}

	useEffect(() => {
		setPayload(() => {
			return {
				text: search
			}
		})
	}, [search])

	return (
		<div className='grid wide sm-gutter'>
			<div className='h-[82px] flex gap-[5px] items-center px-2 sm-gutter'>
				<LogoComponent />
				<div className='w-full flex justify-center'>
					<div className='w-[90%]'>
						<div className='bg-[#fff] h-10 flex items-center mt-[15px] rounded-sm'>
							<div className='flex-1 h-full relative group' id='header_search'>
								<input
									type='text'
									placeholder={t`HEADER.HISTORY.PLACEHOLDER.DESCRIPTION`}
									className='w-full h-full text-sm text-[#333] px-3 py-0 rounded-[3px] border-[none] focus:border-none focus:outline-none'
									onKeyDown={handleKeyDown}
									onFocus={() => {
										setTimeout(() => {
											setShowHistory(true)
										}, 500)
									}}
									onBlur={() => {
										setTimeout(() => {
											setShowHistory(false)
										}, 500)
									}}
									value={payload.text}
									onChange={(e) =>
										setPayload(() => {
											return {
												text: e.target.value
											}
										})
									}
								/>
								{showHistory && (
									<>
										<div className='absolute top-[calc(100%_-_-2px)] w-full bg-[#fff] shadow-[0_1px_5px_rgba(189,189,189)] overflow-hidden z-[3] rounded-[3px] left-0'>
											<h3 className='text-sm text-[#999] font-normal mx-3 my-1.5'>
												{t`HEADER.HISTORY.LABEL.HISTORY`}
											</h3>
											{!isLoadingHistorySearch && (
												<div className='mt-1.5'>
													{dataHistorySearch?.response?.map((item: SearchHistoryModel) => (
														<div
															key={item.id}
															className='h-[38px] px-3 py-0 hover:bg-[#fafafa]'>
															<NavLink
																to={`/search/${item.text}`}
																onClick={() => {
																	setTimeout(() => {
																		setShowHistory(false)
																	}, 500)
																}}
																className='no-underline text-sm leading-[2.375rem] text-[#333] block hover:text-[unset]'>
																{item.text}
															</NavLink>
														</div>
													))}
												</div>
											)}
										</div>
									</>
								)}
							</div>
							{/* <div className='group relative cursor-pointer pl-4 border-l-[#ccc] border-l border-solid'>
								<span className='text-sm contents text-[#333]'>{t`HEADER.HISTORY.LABEL.IN_SHOP`}</span>
								<span className='text-[rgb(131,131,131)] text-sm relative ml-2 mr-4 my-0 top-px'>
									<i className='fa-solid fa-angle-down'></i>
								</span>
								<ul className='group-hover:block hidden absolute w-[120px] shadow-[0_1px_2px_#ccc] text-left animate-[fadeIn_ease-in_0.2s] z-[1] pl-0 rounded-[3px] right-0 top-[147%]'>
									<li className='bg-[#fff] p-2 rounded-t-[3px]'>
										<span className='text-[#333] text-sm ml-2'>{t`HEADER.HISTORY.LABEL.IN_SHOP`}</span>
										<i className='fa-solid fa-check text-sm text-[#ee4d2d]  ml-3 inline-block'></i>
									</li>
									<li className='bg-[#fff] p-2 rounded-t-[3px]'>
										<span className='text-[#333] text-sm ml-2'>
											{t`HEADER.HISTORY.LABEL.OUT_SHOP`}
										</span>
										<i className='fa-solid fa-check text-sm text-[#ee4d2d] hidden ml-3'></i>
									</li>
								</ul>
							</div> */}
							<button
								type='button'
								aria-label='Search'
								onClick={onSearch}
								className='h-[34px] w-[60px] bg-[#ee4d2d] mr-[3px] rounded-[3px] border-[none]'>
								<span className='text-[0.875rem] text-[#fff]'>
									<i className='fa-solid fa-magnifying-glass'></i>
								</span>
							</button>
						</div>
						{!isLoadingSearchSuggestion && (
							<SuggestListComponent data={dataSearchSuggestion?.response || []} />
						)}
					</div>
				</div>
				<HeaderCartComponent
					loading={isLoadingDataCart}
					totalCart={dataCart?.total || 0}
					data={dataCart?.response || [[]]}
				/>
			</div>
		</div>
	)
}
export default memo(HeaderSearchHistoryComponent)
