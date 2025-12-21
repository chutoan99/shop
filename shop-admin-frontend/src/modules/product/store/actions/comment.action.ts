import { ActionType, createAction, props } from '@ngrx/store'
import { CommentModel } from '../../models'

export const GET_COMMENTS = '@Comments/GetAll'
export const GET_COMMENTS_SUCCESS = '@Comments/GetAllSuccess'
export const GET_COMMENTS_FAILED = '@Comments/GetAllFailed'

export const getAllComment = createAction(GET_COMMENTS)
export const getAllCommentSuccess = createAction(GET_COMMENTS_SUCCESS, props<{ comments: CommentModel[] }>())
export const getAllCommentFailed = createAction(GET_COMMENTS_FAILED, props<{ error?: string }>())

export type CommentActions =
	| ActionType<typeof getAllComment>
	| ActionType<typeof getAllCommentSuccess>
	| ActionType<typeof getAllCommentFailed>
