import { ControlType, FieldCondition } from '@core/libs/form-builder/interfaces'
import { TypeCompare } from '@core/libs/form-builder/resources'

export const FIELDS_CONDITION: FieldCondition[] | [] = [
	{
		Name: 'Name',
		Icon: '',
		Disable: false,
		ControlType: ControlType.Input,
		TypeCompare: TypeCompare.TEXT
	},
	{
		Name: 'Sold',
		Icon: '',
		Disable: false,
		ControlType: ControlType.NumberInt,
		TypeCompare: TypeCompare.NUMBER
	},
	{
		Name: 'Stock',
		Icon: '',
		Disable: false,
		ControlType: ControlType.NumberInt,
		TypeCompare: TypeCompare.NUMBER
	},
	{
		Name: 'Price',
		Icon: '',
		Disable: false,
		ControlType: ControlType.NumberInt,
		TypeCompare: TypeCompare.NUMBER
	},
	{
		Name: 'CreateAt',
		Icon: '',
		Disable: false,
		ControlType: ControlType.DateTime,
		TypeCompare: TypeCompare.DATE
	},
	{
		Name: 'IsDiscount',
		Icon: '',
		Disable: false,
		ControlType: ControlType.CheckBox,
		TypeCompare: TypeCompare.BOOLEAN
	}
]
