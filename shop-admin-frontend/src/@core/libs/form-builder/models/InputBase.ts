export class InputBase<T> {
	ID: number
	Name: string
	DataCol: any
	ControlType: number
	Class: string
	DefaultValue: any
	AllowEdit: boolean
	Params: any
	Guide: string
	Question: string
	Required?: boolean
	Value?: T
	Validators?: any[]
	HideColumn?: boolean
	HasCondition?: boolean
	Conditions?: any
	constructor(
		options: {
			ID?: number
			Name?: string
			Required?: boolean
			Value?: T
			DataCol?: any
			DefaultValue?: string
			HideColumn?: boolean
			AllowEdit?: boolean
			Guide?: string
			Question?: string
			HasCondition?: boolean
			Conditions?: string
			GroupName?: string
			GroupCode?: string
		} = {}
	) {
		this.ID = options.DataCol.ID
		this.Name = options.DataCol.Name
		this.ControlType = options.DataCol.ControlType && options.DataCol.ControlType
		this.Class = options.DataCol.Class
		this.DefaultValue = options.DataCol.DefaultValue
		this.AllowEdit = options.DataCol.AllowEdit
		this.Guide = options.DataCol.Guide
		this.Question = options.DataCol.Question
		this.HasCondition = options.DataCol.HasCondition
		this.Conditions = options.DataCol.Conditions
	}
}
