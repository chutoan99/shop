import { memo, useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { QueryPostDto } from '@modules/post/interfaces'
import { LoadingDefaultComponent, PaginationComponent, SearchEmptyComponent } from '@modules/shared'
import { ProductListComponent } from '@modules/post/components'
import { HomeFilterComponent } from '@modules/home/home-filter'
import { useSearchProductQuery } from '@hooks/apis/post.hook'

function SearchPage(): JSX.Element {
	const { search } = useParams()
	const [totalPage, setTotalPage] = useState<number>(0)

	const payload = useMemo<QueryPostDto>(
		() => ({
			name: search,
			limit: 50,
			page: 1
		}),
		[search]
	)

	const { data, isLoading } = useSearchProductQuery(payload)

	useEffect(() => {
		data?.totalPage && setTotalPage(data.totalPage)
	}, [data, payload])

	const updatePayload = useCallback((newPage: number) => {
		setTotalPage((prev) => (prev !== newPage ? newPage : prev))
	}, [])

	return (
		<>
			{isLoading && <LoadingDefaultComponent />}
			{data?.response.length === 0 ? (
				<SearchEmptyComponent />
			) : (
				<div className='row sm-gutter py-[30px]'>
					<div className='col l-12'>
						<div className='padding-search mob:pt-[50px] mob:hidden block'></div>
						<HomeFilterComponent />
						<ProductListComponent
							col={'col l-2-4 mo-4 c-6'}
							loading={isLoading}
							items={data?.response || []}
						/>
						<PaginationComponent setPayload={updatePayload} totalPage={totalPage || 0} />
					</div>
				</div>
			)}
		</>
	)
}
export default memo(SearchPage)
