import { Request, Response } from 'express'
import CommentService from './comment.service'
import CommentQuery from './comment.query'
import CloudSystem from '~/systems/cloudinary/cloud.system'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { CommentModel } from './comment.model'
import { CreateCommentDto } from './comment.dto'
class CommentController {
	private readonly _commentService: CommentService
	private readonly _cloudSystem: CloudSystem
	constructor() {
		this._commentService = new CommentService()
		this._cloudSystem = new CloudSystem()
	}

	public GetAll = async (req: Request, res: Response) => {
		try {
			const queries = new CommentQuery(req)
			const response = await this._commentService.findComments(queries)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}

	public Create = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const imageUrls: string[] = await this._cloudSystem.uploadFiles(
				req.files
			)
			const payload: CreateCommentDto = req.body
			imageUrls && (payload.images = JSON.stringify(imageUrls))

			const response = await this._commentService.createComment(
				+req.user.userid,
				payload
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new CommentController()
