import { PaginationAdapter } from '@core/adapters/pagination.adapter'
import { AccountInfoModel } from './account.model'

export class AccountPaginationAdapter extends PaginationAdapter<AccountInfoModel> {
	constructor(data: any) {
		data.response = data.response.map((item: any) => AccountInfoModel.fromJson(item))
		super(data)
	}
}
