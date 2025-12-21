import { Component, Inject, Input, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {} from '@angular/common/http'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { ControlType, FieldCondition, IComparison } from '@core/libs/form-builder/interfaces'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import {
	BOOLEAN_CONDITION,
	COMPARES,
	ComparisonOperator,
	DATE_CONDITION,
	INPUT_COMPARE,
	INPUT_CONDITIONS,
	LogicCompares,
	NUMBER_CONDITION,
	SELECT_CONDITION,
	TEXT_CONDITION,
	TypeCompare
} from '@core/libs/form-builder/resources'
import { _ } from '@core/utils'
import { POPUP_DATA } from '@core/libs/popup/popup.config'
import { PopupRef } from '@core/libs/popup/popup-ref'

export interface DynamicQueryBuilderProps {
	title: string
	fieldsCondition: FieldCondition[]
}

export interface InputConditions {
	FieldCompare: any
	Operator: any
	ValueCompare: any
}
enum ActionFieldCondition {
	AddCondition,
	RemoveCondition,
	RemoveAllCondition,
	MoveCondition
}
@Component({
	templateUrl: '../templates/dynamic-query-builder.template.html',
	styleUrls: ['../styles/dynamic-query-builder.style.scss'],
	host: {
		'[class.app-dynamic-query-builder]': 'true'
	},
	imports: [
		CommonModule,
		FormsModule,
		NzDrawerModule,
		CommonModule,
		DragDropModule,
		ReactiveFormsModule,
		FormsModule,
		NzSelectModule,
		NzInputModule,
		NzToolTipModule,
		NzCheckboxModule,
		NzDatePickerModule
	]
})
export class DynamicQueryBuilderComponent {
	protected fieldsCondition: FieldCondition[] | [] = []
	protected form!: FormGroup
	protected conditions: InputConditions[] = []
	protected conditionsInputBase = new Map<string, InputConditions[]>()

	protected readonly compares = Array.from(COMPARES.values())
	protected readonly inputCompare: ReadonlyMap<string, any> = INPUT_COMPARE
	protected readonly TYPE_COMPARE: typeof TypeCompare = TypeCompare
	protected readonly LOGIC_COMPARES: typeof LogicCompares = LogicCompares
	protected readonly OPERATOR: typeof ComparisonOperator = ComparisonOperator
	protected readonly ACTION_FIELD_CONDITION: typeof ActionFieldCondition = ActionFieldCondition
	protected readonly textsCondition: IComparison[] = Array.from(TEXT_CONDITION.values())
	protected readonly datesCondition: IComparison[] = Array.from(DATE_CONDITION.values())
	protected readonly numbersCondition: IComparison[] = Array.from(NUMBER_CONDITION.values())
	protected readonly selectsCondition: IComparison[] = Array.from(SELECT_CONDITION.values())
	protected readonly booleansCondition: IComparison[] = Array.from(BOOLEAN_CONDITION.values())

	constructor(
		private fb: FormBuilder,
		private readonly _popupRef: PopupRef,
		@Inject(POPUP_DATA) public data: DynamicQueryBuilderProps
	) {
		this.fieldsCondition = data.fieldsCondition
		this.form = this.fb.group({
			Compare: [this.compares[0]],
			Logics: this.fb.array([])
		})
	}
	public get logics(): FormArray {
		return this.form.get('Logics') as FormArray
	}

	getFieldCompareControl(index: number): FormControl {
		const control = this.logics.controls[index]?.get('FieldCompare')
		return control ? (control as FormControl) : new FormControl() // return a default FormControl if null
	}

	getOperatorCompareControl(index: number): FormControl {
		const control = this.logics.controls[index]?.get('Operator')
		return control ? (control as FormControl) : new FormControl() // return a default FormControl if null
	}

	getValueCompareControl(index: number): FormControl {
		const control = this.logics.controls[index]?.get('ValueCompare')
		return control ? (control as FormControl) : new FormControl() // return a default FormControl if null
	}

	ngOnInit() {
		if (this.logics.length === 0) {
			this._addCondition() // Add logic condition when no logics are present
		}
		// if (this.logics?.length > 0) {
		// 	this._createInputBaseCondition()
		// }
		// this._renderLogics()
	}
	// ************************************************************
	// HANDLE EVENT
	// ************************************************************

	/**
	 * @return {void}
	 */
	private _addCondition(): void {
		const defaultFieldCompare = this.fieldsCondition[0] ?? null

		const control = {
			FieldCompare: new FormControl(defaultFieldCompare),
			Operator: new FormControl(null),
			ValueCompare: new FormControl('')
		}

		this.logics.push(new FormGroup(control))
		console.log(this.logics, 'this.logics')
		this._createInputBaseCondition()
	}

	/**
	 * @param {number} index
	 * @return {void}
	 */
	private _removeCondition(index: number): void {
		console.log(this.form, index)
		this.logics.value.removeAt(index)

		// const existingConditions = this.conditionsInputBase.get(this.key) as InputConditions[]
		// existingConditions.splice(index, 1)
		// this.conditionsInputBase.set(this.key, existingConditions)
		// this.conditions = this.conditionsInputBase.get(this.key) as InputConditions[]
	}

	/**
	 * @return {void}
	 */
	private _removeAllCondition(): void {
		this.logics.clear()
		// this.conditionsInputBase.clear()
		// this.conditions = this.conditionsInputBase.get(this.key) as InputConditions[]
	}

	// /**
	//  * @param {CdkDragDrop<string[]>} event
	//  * @return {void}
	//  */
	// private _moveCondition(event: CdkDragDrop<string[]>): void {
	// 	_.moveItemInFormArray(this.logics, event.previousIndex, event.currentIndex)
	// 	moveItemInArray(this.conditions, event.previousIndex, event.currentIndex)
	// }

	/**
	 * @param {number} index
	 * @param {ActionFieldCondition} action
	 * @param {any} event
	 * @return {void}
	 */
	protected onHandleAction(event: any, action: ActionFieldCondition, index?: number): void {
		switch (action) {
			case this.ACTION_FIELD_CONDITION.AddCondition:
				return this._addCondition()
			case ActionFieldCondition.RemoveAllCondition:
				return this._removeAllCondition()
			case ActionFieldCondition.RemoveCondition:
				console.log(index, 'indexindexindexindex')
				if (index) {
					return this._removeCondition(index)
				}
				break
			case ActionFieldCondition.MoveCondition:
			// 	return this._moveCondition(event as CdkDragDrop<string[]>)
		}
	}

	// ************************************************************
	// HANDLE LOGIC
	// ************************************************************

	// /**
	//  * @return {any}
	//  */
	// private _renderLogics(): void {
	// 	if (this?.formEdit?.Logics?.length > 0) {
	// 		this.formEdit.Logics?.forEach((item: any) => {
	// 			const ValueCompare =
	// 				item.FieldCompare.TypeCompare === TypeCompare.DATE ? new Date(item.ValueCompare) : item.ValueCompare

	// 			const control = new FormGroup({
	// 				FieldCompare: new FormControl(item.FieldCompare, Validators.required),
	// 				Operator: new FormControl(item.Operator),
	// 				ValueCompare: new FormControl(ValueCompare)
	// 			})

	// 			this.logics.push(control)
	// 			this._createInputBaseCondition()
	// 		})
	// 	}
	// }

	/**
	 * @param {Field} field
	 * @return {any}
	 */
	private _createInputBaseCondition(): void {
		this.conditions.push(INPUT_CONDITIONS)
	}
	confirm() {
		if (!this.form.valid) {
			return
		}

		this._popupRef.close(this.form.value)
	}
}
