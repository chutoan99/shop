import { useEffect, memo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingDefaultComponent } from '../shared/loading'
import { SearchEmptyComponent } from '../shared/searchEmpty'
import ProductListComponent from '../post/components/product-list.component'
import { PaginationComponent } from '../shared'
import { QueryCategoryDto } from '../home/category/interfaces'
import { useSearchCategoriesQuery } from '../home/category/hooks'
import { CONSTANT } from '../home/category/resources'
import FilterComponent from '../home/category/components/filter/filter.component'
import { SortBarsComponent } from '../home/category/components'

function CategoryPage(): JSX.Element {
	const { display_name } = useParams()
	const [totalPage, setTotalPage] = useState<number>(0)
	const [payload, setPayload] = useState<QueryCategoryDto>({
		category_name: encodeURIComponent(display_name as string),
		limit: CONSTANT.LIMIT,
		page: CONSTANT.PAGE
	})
	const { data, isLoading } = useSearchCategoriesQuery(payload)

	useEffect(() => {
		data?.totalPage && setTotalPage(data?.totalPage)
	}, [payload, data])

	return (
		<>
			{isLoading && <LoadingDefaultComponent />}
			{data?.response.length === 0 ? (
				<SearchEmptyComponent />
			) : (
				<div className='row sm-gutter pt-[30px]'>
					<div className='col l-2 col-smo-3 c-3'>
						<FilterComponent />
					</div>
					<div className='col l-10'>
						<div className='padding-search mob:pt-[50px] mob:hidden block'></div>
						<SortBarsComponent />
						<ProductListComponent
							col={'col l-2-4 mo-4 c-6'}
							items={data?.response || []}
							loading={isLoading}
						/>
						<PaginationComponent setPayload={setPayload} totalPage={totalPage || 0} />
					</div>
				</div>
			)}
		</>
	)
}
export default memo(CategoryPage)
