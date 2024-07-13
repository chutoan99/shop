import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CommentState } from './comment.reducer'

const featureComment = createFeatureSelector<CommentState>('comment') // tên mình đặt trong ngrx tools

// lấy  ra các giá trị lưu trong store có thể lấy tất cả,
// trong trường hợp này thì chỉ lấy item trong post

export const commentSelector = createSelector(featureComment, (state) => state.items)
