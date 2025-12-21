import SearchCategoryTreeDto from '../dto/search-industry-category-tree.dto'
import { IndustryCategoryTreeModel } from '../model'

export interface IIndustryCategoryTreeRepository {
	findAll(
		queries: SearchCategoryTreeDto
	): Promise<IndustryCategoryTreeModel[]>
}
export interface IIndustryCategoryTreeService {
	findAll(
		queries: SearchCategoryTreeDto,
		userId: number
	): Promise<IndustryCategoryTreeModel[]>
}
