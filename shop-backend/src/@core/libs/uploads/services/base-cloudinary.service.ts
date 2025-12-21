import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'
import multer, { Multer } from 'multer'

export default class BaseCloudINaryService {
	protected _storage: CloudinaryStorage | null = null
	protected _uploadCloud: Multer | null = null

	constructor() {
		this.initializeStorage()
	}

	public getUploader(): Multer {
		if (!this._uploadCloud) {
			throw new Error(
				'Cloudinary configuration is not initialized. Please ensure the connection is established first.'
			)
		}
		return this._uploadCloud
	}

	protected initializeStorage = async (): Promise<void> => {
		if (!this._uploadCloud) {
			const storageOptions: Options = {
				cloudinary,
				params: async () => {
					return {
						folder: 'shopee',
						allowedFormats: ['jpg', 'png']
					}
				}
			}

			// Initialize storage and multer instance
			this._storage = new CloudinaryStorage(storageOptions)
			this._uploadCloud = multer({ storage: this._storage })
		}
	}
}
