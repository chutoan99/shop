import { InputConditions } from '../../components/field-condition/field-condition.component'
import { InputBase } from '../../models'
import { LogicCompares } from '../enum.resource'

export const COMPARES: ReadonlyMap<LogicCompares, any> = new Map([
	[
		LogicCompares.AND,
		{
			Name: 'Và',
			Code: 'AND',
			Disable: false,
			Type: LogicCompares.AND
		}
	],
	[
		LogicCompares.OR,
		{
			Name: 'Hoặc',
			Code: 'OR',
			Disable: false,
			Type: LogicCompares.OR
		}
	],
	[
		LogicCompares.CUSTOM,
		{
			Name: 'Tùy chỉnh',
			Disable: false,
			Code: 'CUSTOM',
			Type: LogicCompares.CUSTOM
		}
	]
])

export const INPUT_COMPARE: ReadonlyMap<string, InputBase<any>> = new Map([
	[
		'Compare',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: 'Vui lòng chọn giá trị',
				AllowNull: true,
				Name: 'Compare',
				Class: '',
				AllowEdit: true
			}
		})
	],
	[
		'LogicCustom',
		new InputBase({
			DataCol: {
				ID: '',
				VnName: '  ',
				AllowNull: true,
				Name: 'LogicCustom',
				Class: '',
				AllowEdit: true
			}
		})
	]
])

export const INPUT_CONDITIONS = {
	FieldCompare: '',
	Operator: '',
	ValueCompare: ''
}
