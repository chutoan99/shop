// import { InputBase } from 'src/app/shared/field-form/models/InputBase';
// import { POPUP_DEFAULT } from './field-config-default.resource';

// export const POPUP_UPLOAD = new Map([
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
//     'Quantity',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         VnName: 'Vui chọn số tệp tối đa',
//         AllowNull: true,
//         Name: 'Quantity',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
//   [
//     'Size',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         VnName: 'Vui chọn kích thước tối đa',

//         AllowNull: true,
//         Name: 'Size',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
//   [
//     'FileType',
//     new InputBase({
//       CellData: '',
//       DataCol: {
//         ID: '',
//         VnName: 'Vui chọn định dạng hỗ trợ',
//         AllowNull: true,
//         Name: 'FileType',
//         Class: '',
//         AllowEdit: true,
//       },
//     }),
//   ],
// ]);

export const OPTIONS_COUNT = [
	{
		type: 1,
		text: '1'
	},
	{
		type: 2,
		text: '3'
	},
	{
		type: 3,
		text: '5'
	},
	{
		type: 4,
		text: '7'
	},
	{
		type: 5,
		text: '10'
	}
]

export const OPTIONS_SIZE = [
	{
		type: 1,
		text: '1 MB'
	},
	{
		type: 2,
		text: '3 MB'
	},
	{
		type: 3,
		text: '5 MB'
	},
	{
		type: 4,
		text: '10 MB'
	},
	{
		type: 5,
		text: '20 MB'
	},
	{
		type: 6,
		text: '30 MB'
	},
	{
		type: 7,
		text: '40 MB'
	},
	{
		type: 8,
		text: '50 MB'
	}
]

export const OPTIONS_FILE_TYPE = [
	{
		tpe: 1,
		text: 'Word',
		fileType: 'application/msword'
	},
	{
		tpe: 2,
		text: 'PowerPoint',
		fileType: 'application/vnd.ms-powerpoint'
	},
	{
		tpe: 3,
		text: 'Excel',
		fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
	},
	{
		tpe: 4,
		text: 'Outlook',
		fileType: 'application/vnd.ms-outlook'
	},
	{
		tpe: 5,
		text: 'Text',
		fileType: 'text/plain, text/html, htm html xhtml'
	},
	{
		tpe: 6,
		text: 'PDF',
		fileType: 'application/pdf'
	},
	{
		tpe: 7,
		text: 'Image',
		fileType: 'image/*'
	},
	{
		tpe: 8,
		text: 'Video',
		fileType: 'video/mp4,video/x-m4v,video/*'
	}
]
