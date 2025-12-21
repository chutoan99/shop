import { ComparisonOperator, TypeCompare } from '../resources'
import { ControlType } from './datatype.interface'

export interface FieldCondition {
	Icon?: string
	Name: string
	Disable: boolean
	ControlType: ControlType
	TypeCompare: TypeCompare
}

export interface IComparison {
	Display: string
	Type: ComparisonOperator
	Label: string
	Disable: boolean
}
