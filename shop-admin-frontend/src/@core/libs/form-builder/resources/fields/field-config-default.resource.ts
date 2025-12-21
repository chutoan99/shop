import { InputBase } from '../../models'

export const POPUP_DEFAULT = new Map([
	[
		'InputName',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Nhập tên trường',
				AllowNull: true,
				Name: 'InputName',
				Class: '',
				AllowEdit: true
			}
		})
	],
	[
		'Question',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Nhập câu hỏi',
				AllowNull: true,
				Name: 'Question',
				Class: '',
				AllowEdit: true
			}
		})
	],
	[
		'Guide',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Nhập mô tả',
				AllowNull: true,
				Name: 'Guide',
				Class: '',
				AllowEdit: true
			}
		})
	],
	[
		'IsRequired',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Trường bắt buộc',
				AllowNull: true,
				Name: 'IsRequired',
				Class: '',
				AllowEdit: true,
				Value: true
			}
		})
	],
	[
		'IsReadOnly',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Chỉ xem',
				AllowNull: true,
				Name: 'IsReadOnly',
				Class: '',
				AllowEdit: true,
				Value: true
			}
		})
	],
	[
		'DataCMS',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Vui lòng chọn giá trị',
				Name: 'DataCMS',
				AllowNull: true,
				Class: '',
				AllowEdit: true
			}
		})
	]
])

export const POPUP_DEFAULT_EXTRA: ReadonlyMap<string, InputBase<any>> = new Map([
	...POPUP_DEFAULT,
	[
		'ValueDefault',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Nhập giá trị mặc định',
				AllowNull: true,
				Name: 'ValueDefault',
				Class: '',
				AllowEdit: true
			}
		})
	]
])
