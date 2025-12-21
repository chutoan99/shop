import { useEffect, memo, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { QueryCategoryDto } from '@modules/home/category/interfaces'
import { CONSTANT } from '@modules/post/resources'
import { LoadingDefaultComponent, PaginationComponent, SearchEmptyComponent } from '@modules/shared'
import { FilterComponent, SortBarsComponent } from '@modules/home/category/components'
import { ProductListComponent } from '@modules/post/components'
import { HomeFilterComponent } from '@modules/home/home-filter'
import { useSearchCategoriesQuery } from '@hooks/apis/category.hook'

function CategoryPage(): JSX.Element {
	const { display_name } = useParams()
	const [totalPage, setTotalPage] = useState<number>(0)

	const payload = useMemo<QueryCategoryDto>(
		() => ({
			category_name: encodeURIComponent(display_name as string),
			limit: CONSTANT.LIMIT,
			page: CONSTANT.PAGE
		}),
		[display_name]
	)

	const dataCategories = useSearchCategoriesQuery(payload)

	const updatePayload = useCallback((newPage: number) => {
		setTotalPage((prev) => (prev !== newPage ? newPage : prev))
	}, [])

	return (
		<>
			{dataCategories.isLoading && <LoadingDefaultComponent />}
			{dataCategories.data?.length === 0 && <SearchEmptyComponent />}
			{dataCategories.data?.length !== 0 && (
				<div className='row sm-gutter pt-[30px]'>
					<div className='col l-2 col-smo-3 c-3'>
						<FilterComponent />
					</div>
					{dataCategories.isSuccess && (
						<div className='col l-10'>
							<div className='padding-search mob:pt-[50px] mob:hidden block'></div>
							<HomeFilterComponent />
							<ProductListComponent
								col={'col l-2-4 mo-4 c-6'}
								items={dataCategories.data || []}
								loading={dataCategories.isLoading}
							/>
							<PaginationComponent setPayload={updatePayload} totalPage={totalPage || 0} />
						</div>
					)}
				</div>
			)}
		</>
	)
}
export default memo(CategoryPage)
