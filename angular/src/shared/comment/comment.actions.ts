import { ActionType, createAction, props } from '@ngrx/store'
import { Comment } from '../../types/comment.model'

export const GET_COMMENTS_START = '@Comment/GetAll'
export const GET_COMMENTS_SUCCESS = '@Comment/GetAllSuccess'
export const GET_COMMENTS_FAILED = '@Comment/GetAllFailed'

export const getAllStart = createAction(GET_COMMENTS_START)
export const getAllSuccess = createAction(GET_COMMENTS_SUCCESS, props<{ comments: Comment[] }>())
export const getAllFailed = createAction(GET_COMMENTS_FAILED, props<{ error?: string }>())

export type CommentActions =
	| ActionType<typeof getAllStart>
	| ActionType<typeof getAllSuccess>
	| ActionType<typeof getAllFailed>
