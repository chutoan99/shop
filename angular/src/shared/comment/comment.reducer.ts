import { createReducer, on } from '@ngrx/store'
import * as CommentActions from './comment.actions'
import { Comment } from '../../types/comment.model'

export interface CommentState {
	items: Comment[]
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
	// get all
	on(CommentActions.getAllStart, (state: CommentState) => ({
		...state
	})),

	on(CommentActions.getAllSuccess, (state: CommentState, action: any) => ({
		...state,
		success: true,
		items: action
	})),

	on(CommentActions.getAllFailed, (state: CommentState, action: any) => ({
		items: [],
		success: false,
		error: action.error
	}))
)
