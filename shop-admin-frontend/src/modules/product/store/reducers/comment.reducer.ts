import { createReducer, on } from '@ngrx/store'
import { CommentModel } from '../../models'
import * as CommentActions from '../actions'

export interface CommentState {
	items: CommentModel[]
	success: boolean
	error: boolean | string
}

const initialState: CommentState = {
	items: [],
	success: false,
	error: false
}

export const commentReducer = createReducer(
	initialState,

	on(CommentActions.getAllComment, (state: CommentState) => ({
		...state
	})),

	on(CommentActions.getAllCommentSuccess, (state: CommentState, action: any) => ({
		success: true,
		items: action,
		error: false
	})),

	on(CommentActions.getAllCommentFailed, (state: CommentState, action: any) => ({
		...state,
		success: false,
		error: action.error
	}))
)
