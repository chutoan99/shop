// import { InputBase } from 'src/app/shared/field-form/models/InputBase';
// import { OptionNumber } from './enum.resource';
// import { POPUP_DEFAULT } from './field-config-default.resource';

import { OptionNumber } from '../enum.resource'

// export const POPUP_NUMBER: ReadonlyMap<string, InputBase<any>> = new Map([
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
//         VnName: 'Vui lòng nhập giá trị',
//         AllowNull: true,
//         Name: 'ValueDefault',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
// ]);

export const OPTIONS_NUMBER = [
	{
		type: OptionNumber.Float,
		text: 'Số thập phân'
	},
	{
		type: OptionNumber.Int,
		text: 'Số tự nhiên'
	},
	{
		type: OptionNumber.Percent,
		text: 'Số phần trăm'
	}
]
