// import { InputBase } from 'src/app/shared/field-form/models/InputBase';
// import { POPUP_DEFAULT } from './field-config-default.resource';
// import { DateTimeFormat } from 'src/app/shared/interfaces';

import { DateTimeFormat } from '../../interfaces'

// export const POPUP_DATE = new Map([
//   ...POPUP_DEFAULT,
//   [
//     'Type',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         VnName: 'Vui lòng chọn giá trị',
//         AllowNull: true,
//         Name: 'Type',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
//   [
//     'ValueDefault',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         TypeOption: DateTimeFormat.DAY_MONTH_YEAR_TIME,
//         VnName: 'Vui lòng nhập giá trị',
//         AllowNull: true,
//         Name: 'ValueDefault',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
//   [
//     'Option',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         VnName: 'Vui lòng chọn giá trị',
//         AllowNull: true,
//         Name: 'Option',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
// ]);

export const OPTIONS_DATE_TIME = [
	{
		type: DateTimeFormat.DAY_MONTH_YEAR_TIME,
		text: 'Ngày/tháng/năm Giờ:phút'
	},
	{
		type: DateTimeFormat.DAY_MONTH_YEAR,
		text: 'Ngày/tháng/năm'
	},
	{
		type: DateTimeFormat.MONTH_YEAR,
		text: 'Tháng/năm'
	},
	{
		type: DateTimeFormat.YEAR,
		text: 'Năm'
	}
]
