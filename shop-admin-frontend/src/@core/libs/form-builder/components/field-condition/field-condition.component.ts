import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'
import { CommonModule, DecimalPipe, NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

// import { MessageService } from 'primeng/api';
// import { DialogModule } from 'primeng/dialog';
// import { DropdownModule } from 'primeng/dropdown';

import { FieldMetadataPipe } from '@core/pipes'
import { _ } from '@core/utils'
import { FieldCondition, IComparison } from '../../interfaces'
import { InputBase } from '../../models'
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
} from '../../resources'

export interface InputConditions {
	FieldCompare: InputBase<any>
	Operator: InputBase<any>
	ValueCompare: InputBase<any>
}

enum ActionFieldCondition {
	AddCondition,
	RemoveCondition,
	RemoveAllCondition,
	MoveCondition
}

@Component({
	selector: 'app-field-condition',
	templateUrl: './field-condition.component.html',
	styleUrl: './field-condition.component.scss',
	host: { class: 'field-condition' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		// DialogModule,
		DragDropModule,
		ReactiveFormsModule,
		// DropdownModule,
		FormsModule
		// NgClass,
		// DecimalPipe,
		// FieldMetadataPipe
		// FieldInputComponent,
		// FieldNumberIntComponent,
		// FieldSelectComponent,
		// FieldDatetimeComponent,
		// FieldLongtextComponent,
		// FieldCheckboxComponent,
	]
})
export class FieldConditionComponent implements OnChanges, OnInit {
	@Input() public form!: FormGroup
	@Input() public key!: string
	@Input() public formEdit: any
	@Input() public fieldsCondition!: FieldCondition[] | []

	protected conditionsInputBase = new Map<string, InputConditions[]>()
	protected conditions: any[] = []
	protected readonly compares = Array.from(COMPARES.values())
	protected readonly inputCompare: ReadonlyMap<string, InputBase<any>> = INPUT_COMPARE

	protected readonly TYPE_COMPARE: typeof TypeCompare = TypeCompare
	protected readonly LOGIC_COMPARES: typeof LogicCompares = LogicCompares
	protected readonly OPERATOR: typeof ComparisonOperator = ComparisonOperator
	protected readonly ACTION_FIELD_CONDITION: typeof ActionFieldCondition = ActionFieldCondition

	protected readonly textsCondition: IComparison[] = Array.from(TEXT_CONDITION.values())
	protected readonly datesCondition: IComparison[] = Array.from(DATE_CONDITION.values())
	protected readonly numbersCondition: IComparison[] = Array.from(NUMBER_CONDITION.values())
	protected readonly selectsCondition: IComparison[] = Array.from(SELECT_CONDITION.values())
	protected readonly booleansCondition: IComparison[] = Array.from(BOOLEAN_CONDITION.values())

	public get logics(): FormArray {
		return this.form.get('Logics') as FormArray
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['formEdit']) {
			this.formEdit = changes['formEdit'].currentValue
		}
		if (changes['fieldsCondition']) {
			//* remove the field itself from the supported fields
			this.fieldsCondition = changes['fieldsCondition'].currentValue.filter(
				(f: FieldCondition) => f.Name !== this.key
			)
		}
	}

	ngOnInit() {
		if (this.logics?.length > 0) {
			this._createInputBaseCondition()
		}
		this._renderLogics()
	}
	// ************************************************************
	// HANDLE EVENT
	// ************************************************************

	/**
	 * @return {void}
	 */
	private _addCondition(): void {
		const control = {
			FieldCompare: new FormControl(this.fieldsCondition[0]),
			Operator: new FormControl(null),
			ValueCompare: new FormControl('')
		}

		this.logics.push(new FormGroup(control))
		this._createInputBaseCondition()
	}

	/**
	 * @param {number} index
	 * @return {void}
	 */
	private _removeCondition(index: number): void {
		this.logics.removeAt(index)
		const existingConditions = this.conditionsInputBase.get(this.key) as InputConditions[]
		existingConditions.splice(index, 1)
		this.conditionsInputBase.set(this.key, existingConditions)

		this.conditions = this.conditionsInputBase.get(this.key) as InputConditions[]
	}

	/**
	 * @return {void}
	 */
	private _removeAllCondition(): void {
		this.logics.clear()
		this.conditionsInputBase.clear()
		this.conditions = this.conditionsInputBase.get(this.key) as InputConditions[]
	}

	/**
	 * @param {CdkDragDrop<string[]>} event
	 * @return {void}
	 */
	private _moveCondition(event: CdkDragDrop<string[]>): void {
		_.moveItemInFormArray(this.logics, event.previousIndex, event.currentIndex)
		moveItemInArray(this.conditions, event.previousIndex, event.currentIndex)
	}

	/**
	 * @param {number} index
	 * @param {ActionFieldCondition} action
	 * @param {any} event
	 * @return {void}
	 */
	protected onHandleAction(event: any, action: ActionFieldCondition, index?: number): void {
		switch (action) {
			case ActionFieldCondition.AddCondition:
				return this._addCondition()
			case ActionFieldCondition.RemoveAllCondition:
				return this._removeAllCondition()
			case ActionFieldCondition.RemoveCondition:
				if (index) {
					return this._removeCondition(index)
				}
				break
			case ActionFieldCondition.MoveCondition:
				return this._moveCondition(event as CdkDragDrop<string[]>)
		}
	}

	// ************************************************************
	// HANDLE LOGIC
	// ************************************************************

	/**
	 * @return {any}
	 */
	private _renderLogics(): void {
		if (this?.formEdit?.Logics?.length > 0) {
			this.formEdit.Logics?.forEach((item: any) => {
				const ValueCompare =
					item.FieldCompare.TypeCompare === TypeCompare.DATE ? new Date(item.ValueCompare) : item.ValueCompare

				const control = new FormGroup({
					FieldCompare: new FormControl(item.FieldCompare, Validators.required),
					Operator: new FormControl(item.Operator),
					ValueCompare: new FormControl(ValueCompare)
				})

				this.logics.push(control)
				this._createInputBaseCondition()
			})
		}
	}

	/**
	 * @param {Field} field
	 * @return {any}
	 */
	private _createInputBaseCondition(): void {
		// if (!this.conditionsInputBase.has(this.key)) {
		// 	this.conditionsInputBase.set(this.key, [])
		// }
		// this.conditionsInputBase.get(this.key)!.push(INPUT_CONDITIONS)
		this.conditions = this.conditionsInputBase.get(this.key)!
	}
}
