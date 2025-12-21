import { AbstractControl, FormArray, FormGroup } from '@angular/forms'

/**
 * @param {string} str
 * @return {string}
 */
export function Capitalize(str: string): string {
	if (typeof str !== 'string') return ''
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection through key.
 *
 * @param {Array<T> | null | undefined} collection - The array of items to be keyed by a specific property. This can be an array, null, or undefined.
 * @param {keyof T} key - The key by which to key the items. This should be a unique property of the items in the array.
 * @return {{ [key: string]: T }} - An object where each key is a unique value from the specified key, and each value is the corresponding item.
 */
export function KeyBy<T>(collection: Array<T> | null | undefined, key: keyof T): { [key: string]: T } {
	if (!collection) return {}

	return collection.reduce(
		(result, item) => {
			const keyValue = item[key]
			const keyString = String(keyValue)

			//* Assign the item to the result object with the key as keyString.
			result[keyString] = item

			return result
		},
		{} as { [key: string]: T }
	)
}

/**
 * Groups an array of items by a specified key.
 *
 * @param {Array<T> | null | undefined} collection - The array of items to be grouped. This can be an array, null, or undefined.
 * @param {keyof T} key - The key by which to group the items. This should be a property of the items in the array.
 * @return {{ [key: string]: T[] }} - An object where each key is a unique value from the specified key, and each value is an array of items that have that key value.
 */
export function GroupBy<T>(collection: Array<T> | null | undefined, key: keyof T): { [key: string]: T[] } {
	if (!collection) return {}

	return collection.reduce(
		(result, item) => {
			const keyValue = item[key]
			const keyString = String(keyValue)

			//* Check if the key already exists in the result object.
			if (result[keyString]) {
				result[keyString].push(item)
			} else {
				//* If the key does not exist, create a new array with the current item.
				result[keyString] = [item]
			}

			return result
		},
		{} as { [key: string]: T[] }
	)
}

/**
 * Keys the items in a FormArray by a specified key.
 *
 * @param formArray The FormArray to key.
 * @param key The key to key by.
 * @return An object where each key is a unique value from the specified key, and the value is the corresponding FormGroup.
 */
export function KeyByFormArray<T>(formArray: FormArray, key: keyof T): { [key: string]: FormGroup } {
	const keyedData: { [key: string]: FormGroup } = {}

	formArray.controls.forEach((control: any) => {
		if (control instanceof FormGroup) {
			const keyValue = control.get(key as string)?.value
			if (keyValue !== undefined) {
				keyedData[keyValue] = control
			}
		}
	})

	return keyedData
}

/**
 * Groups the items in a FormArray by a specified key.
 *
 * @param formArray The FormArray to group.
 * @param key The key to group by.
 * @return An object where each key is a grouped value, and the value is an array of FormControls.
 */
export function GroupByFormArray<T>(formArray: FormArray, key: keyof T): { [key: string]: FormArray } {
	const groupedData: { [key: string]: FormArray<FormGroup> } = {}

	formArray.controls.forEach((control: AbstractControl) => {
		if (control instanceof FormGroup) {
			const groupKey = control.get(key as string)?.value
			if (groupKey !== undefined && groupKey !== null) {
				if (!groupedData[groupKey]) {
					groupedData[groupKey] = new FormArray<FormGroup>([]) // Explicitly typed FormArray<FormGroup>
				}
				groupedData[groupKey].push(control)
			}
		}
	})

	return groupedData
}

/**
 * Flattens a grouped object back into a single array.
 *
 * @param {{ [key: string]: T[] }} grouped - The object with keys as group values and arrays as grouped items.
 * @return {T[]} - A flat array of items from the grouped object.
 */
export function Flatten<T>(grouped: { [key: string]: T[] }): T[] {
	return Object.values(grouped).flat()
}

/**
 * Flattens a grouped object of FormArrays back into a single FormArray.
 *
 * @param groupedFormArrays The object with keys as group values and FormArrays as grouped FormControls.
 * @return A single FormArray containing all FormControls from the grouped FormArrays.
 */
export function FlattenFormArray<T>(groupedFormArrays: { [key: string]: FormArray }): FormArray {
	// Flatten the FormArrays into a single array of FormControls
	const flatControls = Object.values(groupedFormArrays).flatMap((formArray) => formArray.controls)
	return new FormArray(flatControls)
}

/**
 * @param {FormArray} formArray
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {void}
 */
export function moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
	const dir = toIndex > fromIndex ? 1 : -1
	const item = formArray.at(fromIndex)
	for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
		const current = formArray.at(i + dir)
		formArray.setControl(i, current)
	}
	formArray.setControl(toIndex, item)
}
