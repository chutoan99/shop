import { ControlType } from './datatype.interface'

export interface FieldMetaData {
	Disable: boolean
	Icon: string
	Name: string
	ControlType: ControlType
}

export interface Field {
	id: string
	ControlName?: string
	ControlType: ControlType
	DataTypeSetting?: {
		ValueDefault: string
	}
	Guide?: string
	InputCode?: string
	InputConfigName?: string
	InputName: string
	InputValue: string
	IsAllowChange?: boolean
	IsRequired: boolean
	IsShowDescription?: boolean
	IsShowValueDefault?: boolean
	IsSystem?: boolean
	ProcessStepId?: string
	SelectionGuide?: string
	SortOrder?: number
	State?: number
}
