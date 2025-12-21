import { plainToClass, ClassTransformOptions, classToPlain } from 'class-transformer'

export type ClassType<T> = new (...args: any[]) => T

export function transformToClass<T, V>(that: ClassType<T>, plain: V, options?: ClassTransformOptions): T {
	return plainToClass(that, plain, options)
}

export abstract class BaseModel {
	static fromJson<T extends BaseModel, V>(this: ClassType<T>, plain: V, options?: ClassTransformOptions): T {
		return plainToClass(this, plain, options)
	}

	static createEmpty<T extends BaseModel>(this: ClassType<T>, options?: ClassTransformOptions): T {
		return plainToClass(this, {}, options)
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

	static toJson<T extends BaseModel, V>(this: ClassType<T>, classObj: T): Object {
		const plainObj = classToPlain(classObj)
		return plainObj
	}
}
