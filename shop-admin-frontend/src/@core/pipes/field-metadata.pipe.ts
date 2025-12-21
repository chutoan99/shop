import { Pipe, PipeTransform } from '@angular/core'
import { ControlType, FieldMetaData } from '@core/libs/form-builder/interfaces'
import { FIELD_METADATA } from '@core/libs/form-builder/resources'

@Pipe({
	name: 'fieldMetadata',
	standalone: true
})
export class FieldMetadataPipe implements PipeTransform {
	/**
	 * @param {ControlType} controlType
	 * @param {keyof FieldMetaData=} property
	 * @return {any}
	 */
	public transform(controlType: ControlType, property?: keyof FieldMetaData): any {
		const metadata: FieldMetaData | undefined = FIELD_METADATA.get(controlType)
		if (!metadata) {
			return null
		}
		return property ? metadata[property] : metadata
	}
}
