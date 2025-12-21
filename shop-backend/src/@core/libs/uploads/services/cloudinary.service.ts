import { v2 as cloudinary } from 'cloudinary'
import { RequestHandler } from 'express'
import BaseCloudINaryService from './base-cloudinary.service'

export default class CloudINaryService extends BaseCloudINaryService {
	constructor() {
		super()
	}

	public singleFile(fieldName: string): RequestHandler {
		return this.getUploader().single(fieldName)
	}

	public multipleFile(fieldName: string, count: number): RequestHandler {
		return this.getUploader().array(fieldName, count)
	}

	public async deleteFile(filename: string): Promise<void> {
		await cloudinary.uploader.destroy(filename)
	}

	public async uploadFiles(files: any[]): Promise<string[]> {
		const imageUrls: string[] = []

		const uniqueFiles = Array.from(new Set(files.map((f) => f.path)))

		await Promise.all(
			uniqueFiles.map(async (path: string) => {
				const result = await cloudinary.uploader.upload(path)
				imageUrls.push(result.secure_url)
			})
		)

		return imageUrls
	}
}
