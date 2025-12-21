import { FieldMetaData } from '../../interfaces'
import { ControlType } from '../../interfaces/datatype.interface'

export const DISPLAY_CONTENT = [
	{
		Disable: true,
		Icon: '/assets/svg/fields/file.svg',
		Name: 'Tệp mẫu hướng dẫn'
	},
	{
		Disable: false,
		Icon: '/assets/svg/fields/group.svg',
		Name: 'Nhóm hiển thị'
	}
]

export const FIELD_METADATA: ReadonlyMap<ControlType, FieldMetaData> = new Map([
	[
		ControlType.Input,
		{
			Icon: '/assets/svg/fields/single-line.svg',
			Name: '1 dòng',
			Disable: false,
			ControlType: ControlType.Input
		}
	],
	[
		ControlType.LongText,
		{
			Icon: '/assets/svg/fields/multi-line.svg',
			Name: 'Nhiều dòng',
			Disable: false,
			ControlType: ControlType.LongText
		}
	],
	[
		ControlType.QuillEditor,
		{
			Disable: false,
			Icon: '/assets/svg/fields/text.svg',
			Name: 'Siêu Văn Bản',
			ControlType: ControlType.QuillEditor
		}
	],
	[
		ControlType.CheckBox,
		{
			Disable: false,
			Icon: '/assets/svg/fields/checkbox.svg',
			Name: 'Hộp kiểm',
			ControlType: ControlType.CheckBox
		}
	],
	[
		ControlType.Boolean,
		{
			Disable: false,
			Icon: '/assets/svg/fields/boolean.svg',
			Name: 'Đúng sai',
			ControlType: ControlType.Boolean
		}
	],
	[
		ControlType.Select,
		{
			Icon: '/assets/svg/fields/pick-value.svg',
			Name: 'Chọn giá trị',
			Disable: false,
			ControlType: ControlType.Select
		}
	],
	[
		ControlType.DateTime,
		{
			Disable: false,
			Icon: '/assets/svg/fields/time.svg',
			Name: 'Thời gian',
			ControlType: ControlType.DateTime
		}
	],
	[
		ControlType.NumberInt,
		{
			Disable: false,
			Icon: '/assets/svg/fields/number.svg',
			Name: 'Số',
			ControlType: ControlType.NumberInt
		}
	],
	[
		ControlType.Email,
		{
			Disable: false,
			ControlType: ControlType.Email,
			Icon: '/assets/svg/fields/email.svg',
			Name: 'Email'
		}
	],
	[
		ControlType.Currency,
		{
			Disable: false,
			ControlType: ControlType.Currency,
			Icon: '/assets/svg/fields/currency.svg',
			Name: 'Tiền tệ'
		}
	],
	[
		ControlType.Progress,
		{
			Disable: false,
			Icon: '/assets/svg/fields/process.svg',
			Name: 'Tiến độ',
			ControlType: ControlType.Progress
		}
	],
	[
		ControlType.Rating,
		{
			Disable: false,
			Icon: '/assets/svg/fields/rating.svg',
			Name: 'Đánh giá',
			ControlType: ControlType.Rating
		}
	],
	[
		ControlType.UploadFile,
		{
			Disable: false,
			Icon: '/assets/svg/fields/upload.svg',
			Name: 'Tải tệp',
			ControlType: ControlType.UploadFile
		}
	],
	[
		ControlType.People,
		{
			Disable: false,
			Icon: '/assets/svg/fields/person.svg',
			Name: 'Nhân viên',
			ControlType: ControlType.People
		}
	],
	[
		ControlType.SelectMultiple,
		{
			Disable: true,
			Icon: '/assets/svg/fields/job.svg',
			Name: 'Tên vị trí công việc',
			ControlType: ControlType.SelectMultiple
		}
	],
	[
		ControlType.SelectMultipleTree,
		{
			Disable: true,
			Icon: '/assets/svg/fields/organization.svg',
			Name: 'Cơ cấu tổ chức',
			ControlType: ControlType.SelectMultipleTree
		}
	],
	[
		ControlType.Table,
		{
			Disable: true,
			ControlType: ControlType.Table,
			Icon: '/assets/svg/fields/table.svg',
			Name: 'Bảng'
		}
	],
	[
		ControlType.Formula,
		{
			Disable: true,
			ControlType: ControlType.Formula,
			Icon: '/assets/svg/fields/cal.svg',
			Name: 'Công thức'
		}
	],
	[
		ControlType.SubTask,
		{
			Disable: true,
			ControlType: ControlType.SubTask,
			Icon: '/assets/svg/fields/subtask.svg',
			Name: 'Công việc con'
		}
	],
	[
		ControlType.Data,
		{
			Disable: true,
			ControlType: ControlType.Data,
			Icon: '/assets/svg/fields/control-data.svg',
			Name: 'Dữ liệu kết nối'
		}
	]
])
