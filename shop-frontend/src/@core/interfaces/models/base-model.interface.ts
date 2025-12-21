import {
	ClassTransformOptions,
	instanceToInstance as classToClass,
	classToPlain,
	plainToClass
} from 'class-transformer'
export interface IBaseModel {
	created_at: Date
	updated_at: Date | null
}

export type ClassType<T> = new (...args: any[]) => T
export abstract class BaseModel {
	static fromJson<V>(
		this: new (...args: any[]) => any,
		plain: V,
		options?: ClassTransformOptions
	): InstanceType<typeof this> {
		return plainToClass(this, plain, options || { enableImplicitConversion: false })
	}

	static createEmpty<T extends BaseModel>(this: ClassType<T>, options?: ClassTransformOptions): T {
		return plainToClass(this, {}, options)
	}

	static clone<T extends BaseModel, V extends T>(this: ClassType<T>, plain: V, options?: ClassTransformOptions): T {
		return classToClass(plain, options)
	}

	static merge<T extends BaseModel, V>(
		this: ClassType<T>,
		classObj: T,
		plain: V,
		options?: ClassTransformOptions
	): T {
		const plainObj = classToPlain(classObj)
		const objMerged = Object.assign(plainObj, plain)
		return plainToClass(this, objMerged, options)
	}

	static toJson<T extends BaseModel>(this: ClassType<T>, classObj: T): Object {
		const plainObj = classToPlain(classObj)
		return plainObj
	}

	/**
	 * get value from string path
	 *
	 * @param classObj data
	 * @param path string path
	 * get value in object: BaseModel.get('obj.key1')
	 * get value in array: BaseModel.get('arr[index]')
	 * get value in array object: BaseModel.get('arr[index].key1')
	 */
	static get<T extends BaseModel>(this: ClassType<T>, data: T, path: string): any {
		return getByPath(data, path)
	}
}

export function getByPath(obj: any, path: string): any {
	path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
	path = path.replace(/^\./, '') // strip a leading dot
	const paths = path.split('.')
	for (let i = 0, n = paths.length; i < n; ++i) {
		const k = paths[i]
		if (obj && k in obj) {
			obj = obj[k]
		} else {
			return
		}
	}
	return obj
}
