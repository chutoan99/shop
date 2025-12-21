import { Request, Response } from 'express'
import CloudINaryService from '../services/cloudinary.service'
import { AuthenticatedRequest } from '@core/interfaces'
export default class UploadController {
	constructor(private readonly _cloudINaryService: CloudINaryService) {}

	public uploadSingle = [
		this._cloudINaryService.singleFile('images'), // middleware in multer
		async (req: AuthenticatedRequest, res: Response) => {
			try {
				const file = req.file
				if (!file)
					return res.status(400).json({ message: 'No file uploaded' })

				return res.json(file)
			} catch (error: any) {
				return res.status(500).json({ message: error.message })
			}
		}
	]
}
