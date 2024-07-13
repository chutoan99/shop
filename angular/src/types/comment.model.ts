export interface Comment {
	id: number
	orderid: number
	itemid: number
	userid: string
	shopid: number
	cmtid: number
	rating: number
	status: number
	rating_star: number
	like_count: number
	comment: string
	author_username: string
	author_portrait: null | string
	images: any
	cover: string
	videos: string
	model_name: string
	options: string
	liked: number
	mtime: Date
	ctime: Date
	createdAt: Date
	updatedAt: Date
	CommentReply: CommentReply
}

export interface CommentReply {
	id: null
	orderid: null
	itemid: null
	cmtid: null
	userid: null
	shopid: null
	comment: null
	ctime: null
	mtime: null
	createdAt: null
	updatedAt: null
}
