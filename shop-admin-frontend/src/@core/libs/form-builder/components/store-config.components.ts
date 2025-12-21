import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { ChangeDetectorRef, Component, EventEmitter, Output, SimpleChanges } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { _ } from '@core/utils'
import { ControlType, FieldCondition } from '../interfaces'
import { InputBase } from '../models'
import {
	COMPARES,
	DISPLAY_CONTENT,
	DisplayValueSelectType,
	FIELD_METADATA,
	ModePopup,
	OptionNumber,
	TypeSelect
} from '../resources'

enum ActionFormBuilder {
	RemoveGroup,
	RemoveField,
	EditField,
	EditGroupName,
	SwitchCondition,
	Expand
}
@Component({
	selector: 'app-store-config',
	templateUrl: '../templates/store-config.template.html',
	styleUrls: ['../styles/store-config.style.scss'],
	imports: [CommonModule, RouterModule]
})
export class StoreConfigComponent {
	@Output() resultSubmit: EventEmitter<any> = new EventEmitter()
	// @ViewChildren('fieldCondition') fieldCondition!: QueryList<FieldConditionComponent>;

	protected submitted: boolean = true
	protected isMultiRow: boolean = true
	protected visible: boolean = true
	protected isLoading: boolean = false
	protected isCondition: boolean = false

	protected form!: FormGroup
	protected formEdit!: FormGroup
	protected draggedField: any
	protected draggedType: string = ''
	protected indexPopupEdit: number = 0
	protected fieldsInputBaseGroup: Record<string, InputBase<any>[]> = {}
	protected popup = { isVisible: false, mode: ModePopup.Create }

	// protected groups: Group[] = [];
	protected connectedDropLists: string[] = []
	protected targetGroupId: string = ''
	protected inputConfigGroup: Record<string, FormArray> = {}
	protected inputConfigResponse: any[] = []
	protected fieldsCondition: FieldCondition[] = []
	protected tabActive: number = 1
	protected readonly compares = Array.from(COMPARES.values())
	protected readonly fieldMetadata = Array.from(FIELD_METADATA.values())
	// protected readonly MENU_ACTION = MENU_ACTION;
	protected readonly displayContent = DISPLAY_CONTENT
	protected readonly MODE_POPUP: typeof ModePopup = ModePopup
	protected readonly CONTROL_TYPE: typeof ControlType = ControlType
	protected readonly TYPE_SELECT: typeof TypeSelect = TypeSelect
	protected readonly OPTIONS_NUMBER: typeof OptionNumber = OptionNumber
	protected readonly ACTION_FORM_BUILDER: typeof ActionFormBuilder = ActionFormBuilder
	protected readonly DISPLAY_VALUE_SELECT_TYPE: typeof DisplayValueSelectType = DisplayValueSelectType

	constructor(
		private readonly _router: Router,
		private readonly _cdr: ChangeDetectorRef
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		// if (changes['idEdit']) {
		//   this.idEdit = changes['idEdit'].currentValue;
		//   if (this.idEdit === '-1') return;
		//   this._getApiFormConfig();
		// }
	}

	ngOnInit(): void {
		this._defineColumn()
	}

	// ************************************************************
	// HANDLE EVENT POPUP
	// ************************************************************

	/**
	 * @return {void}
	 */
	protected onHideDialog(): void {
		this.visible = false
		this.popup.mode = ModePopup.Create
		this.resultSubmit.emit({
			data: null,
			type: -2
		})
	}

	/**
	 * @return {void}
	 */
	protected onShowPopup(field: any): void {
		this.popup.isVisible = true
		this.onDragStarted(field, this.draggedType)
	}
	/**
	 * @param {number} tab
	 * @return {void}
	 */
	protected onChangeTab(tab: number): void {
		this.tabActive = tab
	}

	/**
	 * @return {void}
	 */
	protected onHidePopup(): void {
		this.popup.isVisible = false
		this.draggedField = null
	}

	/**
	 * @param {any} event
	 * @return {void}
	 */
	protected onResultSubmit(event: any): void {
		this.popup.mode = ModePopup.Create
		this.popup.isVisible = false
		if (event.type == -1) {
			this._router.navigateByUrl('/khao-sat/detail/' + event.data.ID)
		}
	}

	/**
	 * @param {any} field
	 * @return {void}
	 */
	protected onSubmitPopup(field: any): void {
		this.popup.isVisible = false
		if (this.draggedField) {
			this.onShowPopup(this.draggedField)
			this._addField(field)
		}
		this.onHidePopup()
	}

	/**
	 * @return {void}
	 */
	protected onSave(): void {
		if (!this.form.valid) {
			return
		}
	}

	// ************************************************************
	// HANDLE ACTION FORM BUILDER
	// ************************************************************

	/**
	 * @param {any} field
	 * @return {void}
	 */
	private _addField(field: any): void {
		const newForm = this._createField(field)
		const control = this._defineColumnInputConfig(newForm)

		// if (!this.fieldsInputBaseGroup[field.GroupCode]) {
		//   this.fieldsInputBaseGroup[field.GroupCode] = [];
		// }
		// if (!this.inputConfigGroup[field.GroupCode]) {
		//   this.inputConfigGroup[field.GroupCode] = new FormArray([]);
		// }

		//* If in new state, the field will be added, if in update state, the position will be updated immediately.
		if (this.popup.mode === this.MODE_POPUP.Create) {
			this.fieldsInputBaseGroup[field.GroupCode].push(newForm)
			this.inputConfigGroup[field.GroupCode].push(new FormGroup(control))
		} else {
			this.fieldsInputBaseGroup[field.GroupCode][this.indexPopupEdit] = newForm
			this.inputConfigGroup[field.GroupCode].controls[this.indexPopupEdit] = new FormGroup(control)
		}
		this._setFieldsCondition()
		this.popup.mode = ModePopup.Create
	}

	/**
	 * @param {number} index
	 * @param {string} key
	 * @return {void}
	 */
	private _expandFieldConfig(index: number, key: string): void {
		// //* set Value inputConfigGroup
		// const currentValueInputConfig: boolean = (this.inputConfigGroup[key] as FormArray).controls[index].get(
		//   'HideColumn',
		// ).value;
		// (this.inputConfigGroup[key] as FormArray).controls[index].get('HideColumn').setValue(!currentValueInputConfig);
		// //* set Value inputConfigGroup
		// const currentValueInputBase: boolean = this.fieldsInputBaseGroup[key][index].HideColumn;
		// this.fieldsInputBaseGroup[key][index].HideColumn = !currentValueInputBase;
	}

	/**
	 * @param {number} index
	 * @param {string} key
	 * @return {void}
	 */
	private _removeFieldConfig(index: number, key: string): void {
		this.fieldsInputBaseGroup[key].splice(index, 1)
		this.inputConfigGroup[key].removeAt(index)

		// this.formEdit = null;
		this._setFieldsCondition()
	}

	/**
	 * @param {string} key
	 * @param {number} indexGroup
	 * @return {void}
	 */
	private _removeGroupFieldConfig(indexGroup: number, key: string): void {
		delete this.fieldsInputBaseGroup[key]
		delete this.inputConfigGroup[key]
		// this.groups.splice(indexGroup, 1);
		this._setFieldsCondition()
	}

	/**
	 * @param {Field} field
	 * @param {number} index
	 * @param {string} key
	 * @return {void}
	 */
	private _editFieldConfig(index: number, key: string, field: any): void {
		// this.popup.mode = ModePopup.Update;
		// this.formEdit = this.inputConfigGroup[key].controls[index] as FormGroup;
		// this.indexPopupEdit = index;
		// this.targetGroupId = field.GroupCode;
		// this.onShowPopup({ ...field, Name: FIELD_METADATA.get(field.ControlType).Name });
	}

	/**
	 * @param {any} e
	 * @param {string} key
	 * @param {number} indexGroup
	 * @return {void}
	 */
	private _editGroupFieldConfig(indexGroup: number, key: string, e: any): void {
		// const newGroupName = e.target.value.trim();
		// // * Update child forms in a group
		// this.groups[indexGroup].groupName = newGroupName;
		// if (this.inputConfigGroup[key].controls.length === 0) return;
		// (this.inputConfigGroup[key] as FormArray).controls.forEach((f: FormGroup) => {
		//   f.get('GroupName').setValue(newGroupName);
		// });
	}

	/**
	 * @param {any} e
	 * @param {number} index
	 * @return {void}
	 */
	private _switchConditionFieldConfig(index: number, key: string, e: any): void {
		// if (e.checked) {
		//   this._setFieldsCondition();
		//   const currentField = this.inputConfigGroup[key].controls[index].value['VnName'];
		//   (this.inputConfigGroup[key].controls[index] as FormGroup).setControl(
		//     'Conditions',
		//     new FormGroup({
		//       Compare: new FormControl(this.compares[0]), //* logic and || or
		//       CurrentField: new FormControl(currentField.value),
		//       LogicCustom: new FormControl(currentField.value),
		//       Logics: new FormArray([]),
		//     }),
		//   );
		// }
	}

	/**
	 * @param {string} key
	 * @param {number} index
	 * @param {ActionFormBuilder} action
	 * @param {any} event
	 * @return {void}
	 */
	protected onHandleFormBuilder(event: any, action: ActionFormBuilder, key: string, index: number): void {
		switch (action) {
			case ActionFormBuilder.Expand:
				return this._expandFieldConfig(index, key)
			case ActionFormBuilder.EditField:
				const currentField = this.fieldsInputBaseGroup[key][index]
				return this._editFieldConfig(index, key, currentField)
			case ActionFormBuilder.RemoveField:
				return this._removeFieldConfig(index, key)
			case ActionFormBuilder.RemoveGroup:
				return this._removeGroupFieldConfig(index, key)
			case ActionFormBuilder.EditGroupName:
				return this._editGroupFieldConfig(index, key, event)
			case ActionFormBuilder.SwitchCondition:
				return this._switchConditionFieldConfig(index, key, event)
		}
	}

	// ************************************************************
	// HANDLE DRAG & ROP
	// ************************************************************

	/**
	 * @param {Field} field
	 * @param {string} type
	 * @return {void}
	 */
	protected onDragStarted(field: any, type: string): void {
		this.draggedField = field
		this.draggedType = type
	}

	/**
	 * @param {CdkDragDrop<number[]>} event
	 * @return {void}
	 */
	protected onDrop(event: CdkDragDrop<number[]>): void {
		// this.targetGroupId = event.container.connectedTo as string;
		//Tuong.TT: 2024-08-30: fix drag drop
		this.targetGroupId = event.container.id as string
		if (!this.draggedField) return
		if (this.draggedType === 'FieldMetaData') {
			this.onShowPopup(this.draggedField)
		} else {
			//* if the current GroupCode is equal to the targetGroupId then moving back means moving to another Group
			// if (this.draggedField?.GroupCode === this.targetGroupId) {
			//   this._moveItemInGroup(this.targetGroupId, event.previousIndex, event.currentIndex);
			//   return;
			// }
			// if (this.draggedField?.GroupCode !== this.targetGroupId) {
			//   this._moveItemOutGroup(this.draggedField?.GroupCode, this.targetGroupId);
			//   return;
			// }

			//Tuong.TT: 2024-08-30: fix drag drop
			if (event.previousContainer === event.container) {
				// Move item within the same list
				this._moveItemInGroup(this.targetGroupId, event.previousIndex, event.currentIndex)
				return
			} else {
				// Transfer item between lists
				this._moveItemOutGroup(this.draggedField?.GroupCode, this.targetGroupId, event.currentIndex)
				return
			}
		}
	}

	/**
	 * @param {string} key
	 * @param {number} previousIndex
	 * @param {number} currentIndex
	 * @return {void}
	 */
	private _moveItemInGroup(key: string, previousIndex: number, currentIndex: number): void {
		moveItemInArray(this.fieldsInputBaseGroup[key], previousIndex, currentIndex)
		_.moveItemInFormArray(this.inputConfigGroup[key], previousIndex, currentIndex)
	}

	/**
	 * @param {string} currentGroupCode
	 * @param {string} targetGroupCode
	 * @param {number} index
	 * @return {void}
	 */
	private _moveItemOutGroup(currentGroupCode: string, targetGroupCode: string, currentIndex: number): void {
		// //* Get the index of the item to move in the current group
		// if (this.fieldsInputBaseGroup[currentGroupCode]?.length === 0) return;
		// const index = this.fieldsInputBaseGroup[currentGroupCode]?.findIndex((item) => item.ID === this.draggedField?.ID);
		// if (index === -1) return;
		// //* Move the item and config to the target group
		// const newGroup: Group = this.groups.find((g: Group) => g.groupCode === targetGroupCode);
		// let fieldInputBase = this.fieldsInputBaseGroup[currentGroupCode][index] as InputBase<any>;
		// fieldInputBase.GroupCode = newGroup.groupCode;
		// fieldInputBase.GroupName = newGroup.groupName;
		// let inputConfig = this.inputConfigGroup[currentGroupCode].controls[index] as FormGroup;
		// inputConfig.get('GroupCode')?.setValue(newGroup?.groupCode);
		// inputConfig.get('GroupName')?.setValue(newGroup?.groupName);
		// this.fieldsInputBaseGroup[targetGroupCode].push(fieldInputBase);
		// this.inputConfigGroup[targetGroupCode].push(inputConfig);
		// //* Remove the item and config from the current group
		// this.fieldsInputBaseGroup[currentGroupCode].splice(index, 1);
		// this.inputConfigGroup[currentGroupCode].removeAt(index);
		// //TuongTT: 2024-08-30 fix drag drop two group
		// this._moveItemInGroup(targetGroupCode, this.fieldsInputBaseGroup[targetGroupCode].length - 1, currentIndex);
	}

	// ************************************************************
	// HANDLE CONDITION
	// ************************************************************

	/**
	 * @return {void}
	 */
	private _setFieldsCondition(): void {
		// this.fieldsCondition = _.Flatten(this.fieldsInputBaseGroup)?.map((f: InputBase<any>) => {
		//   let typeCompare: TypeCompare = null;
		//   switch (f.ControlType) {
		//     case ControlType.NumberInt:
		//     case ControlType.Currency:
		//     case ControlType.Progress:
		//     case ControlType.Rating:
		//       typeCompare = TypeCompare.NUMBER;
		//       break;
		//     case ControlType.Boolean:
		//     case ControlType.CheckBox:
		//       typeCompare = TypeCompare.BOOLEAN;
		//       break;
		//     case ControlType.DateTime:
		//       typeCompare = TypeCompare.DATE;
		//       break;
		//     case ControlType.LongText:
		//     case ControlType.Input:
		//     case ControlType.Email:
		//       typeCompare = TypeCompare.TEXT;
		//       break;
		//     case ControlType.Select:
		//       typeCompare = TypeCompare.SELECT;
		//       break;
		//   }
		//   return {
		//     Icon: FIELD_METADATA.get(f.ControlType).Icon,
		//     Name: f.VnName,
		//     Disable: false,
		//     ControlType: ControlType.Input,
		//     TypeCompare: typeCompare,
		//   };
		// });
	}

	/**
	 * @return {void}
	 */
	private _defineColumn(): void {
		// this.form = new FormGroup({
		//   ProcessName: new FormControl(null, Validators.required),
		//   Version: new FormControl(null, Validators.required),
		//   ProcessGroupName: new FormControl(null),
		//   Note: new FormControl(''),
		//   InputConfig: new FormArray([]),
		// });
		// this.isLoading = false;
	}

	/**
	 * @param {InputBase<any>} form
	 * @return {any}
	 */
	private _defineColumnInputConfig(form: InputBase<any>): any {
		const control = {}
		// control[form.Name] = new FormControl('');
		// control['ID'] = new FormControl(form.ID);
		// control['VnName'] = new FormControl(form.VnName);
		// control['RowRefId'] = new FormControl(form.RowRefId);
		// control['ControlType'] = new FormControl(form.ControlType);
		// control['Order'] = new FormControl(form.Order);
		// control['AllowNull'] = new FormControl(form.AllowNull);
		// control['AllowEdit'] = new FormControl(form.AllowEdit);
		// control['IsConfirm'] = new FormControl(form.IsConfirm);
		// control['Class'] = new FormControl(form.Class);
		// control['CellData'] = new FormControl(form.CellData);
		// control['TypeOption'] = new FormControl(form.TypeOption);
		// control['Value'] = new FormControl(form.Value);
		// control['tbname'] = new FormControl(form.tbname);
		// control['HideColumn'] = new FormControl(form.HideColumn);
		// control['Guide'] = new FormControl(form.Guide);
		// control['Question'] = new FormControl(form.Question);
		// control['GroupName'] = new FormControl(form.GroupName);
		// control['GroupCode'] = new FormControl(form.GroupCode);
		// control['DefaultValue'] = new FormControl(form.DefaultValue);
		// control['HasCondition'] = new FormControl(form.HasCondition);
		// control['Conditions'] = new FormGroup({});

		return control
	}

	/**
	 * @param {Field} field
	 * @return {InputBase<any>}
	 */
	private _createField(field: any): InputBase<any> {
		const inputBase = new InputBase({
			DataCol: {
				ID: field?.ID,
				ControlType: field?.ControlType,
				DefaultValue: field?.DefaultValue,
				VnName: field?.VnName,
				AllowNull: field?.AllowNull,
				AllowEdit: field?.AllowEdit,
				IsConfirm: field?.IsConfirm,
				Name: field?.Name,
				Class: field?.Class,
				Guide: field?.Guide,
				Question: field?.Question,
				tbname: field.tbname,
				TypeOption: field.tbname,
				GroupName: field.GroupName,
				GroupCode: field.GroupCode,
				HasCondition: field.HasCondition,
				Conditions: field.Conditions,
				Value: field.Value
			}
		})

		return inputBase
	}

	// ************************************************************
	// HANDLE GROUP
	// ************************************************************

	/**
	 * @param {any} field
	 * @return {void}
	 */
	protected addGroup(groupName?: string): void {
		// const newGroup: Group = {
		//   groupName: groupName || `Nhóm ${this.groups?.length + 1}`,
		//   groupCode: ulid(),
		// };
		// this.groups.push(newGroup);
		// this.connectedDropLists = this.groups.map((group) => group.groupCode);
	}

	/**
	 * @return {Group[]}
	 */
	private _getGroups(): void {
		// const flattenedGroups: InputBase<any>[] = _.Flatten(this.fieldsInputBaseGroup);
		// const groupMap = new Map<string, string>();
		// flattenedGroups.forEach(({ GroupName, GroupCode }) => {
		//   const trimmedGroupName = GroupName.trim();
		//   if (!groupMap.has(trimmedGroupName)) {
		//     groupMap.set(trimmedGroupName, GroupCode);
		//   }
		// });
		// //* Tạo mảng groups từ Map
		// this.groups = Array.from(groupMap, ([groupName, groupCode]) => ({
		//   groupCode,
		//   groupName,
		// }));
		// this.connectedDropLists = this.groups.map((group) => group.groupCode);
	}

	// ************************************************************
	// HANDLE API
	// ************************************************************

	/**
	 * @param {Field} field
	 * @return {void}
	 */
	private _saveFormConfig(payload: any): void {}

	/**
	 * @return {void}
	 */
	private _getApiFormConfig(): void {}

	protected handleFilterSelectEmployee(_event: any) {}
}
