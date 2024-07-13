import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { CommentService } from 'src/services/comment/index.service'
import { ProductService } from 'src/services/product/index.service'

import { AppState } from 'src/shared/app.state'
import { shopidSelector } from 'src/shared/inforShop/inforShop.selector'
import { Comment } from 'src/types/comment.model'
import { Product } from 'src/types/product.model'

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
	dataSources$!: Observable<Comment[]>
	dataSourcesList$!: Observable<Product[]>
	loading = false
	query = {
		page: 1,
		limit: 20
	}
	getNumber(discount: String) {
		let xx: Number = +discount.replace(/[^0-9]/g, '')
		let resuft: boolean = false
		if (xx == 50) {
			resuft = true
		} else {
			resuft = false
		}
		return resuft
	}

	ngOnInit(): void {
		this.commentService.getAllComment(this.query).subscribe((data: Comment[]) => {
			console.log(data, 'comment')
			this.dataSources$ = of(data)
		})
		this.productService.getAllProduct(this.query).subscribe((data: Product[]) => {
			this.dataSourcesList$ = of(data)
		})
	}
	constructor(
		private commentService: CommentService,
		private store: Store<AppState>,
		private productService: ProductService
	) {}
}
