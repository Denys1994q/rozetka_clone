import { Component, Input } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { ProductService } from '../product/services/product.service';
import { AuthService } from '../core/services/auth.service';
import { UserData } from '../core/services/auth.service';
import { IComment } from './models/comment.model';
import { IProduct } from '../product/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent {
    @Input() comment!: IComment
    totalLikes: number = 0
    totalDislikes: number = 0
    isLiked: boolean  = false
    isDisliked: boolean  = false
    product: IProduct | null = null
    productSubscription!: Subscription

    constructor(
        private commentsService: CommentsService, 
        private authService: AuthService,
        private productService: ProductService) {
            this.productSubscription = this.productService.product$.subscribe(prod => {
                this.product = prod
            })
        }

    ngOnInit() {
        this.totalLikes = this.comment.likes.length
        this.totalDislikes = this.comment.dislikes.length
        this.authService.userData$.subscribe({
            next: user => {
                this.isLiked = this.comment.likes.some(like => like.user === user?._id)
                this.isDisliked = this.comment.dislikes.some(like => like.user === user?._id)
            } 
        })
    }

    addLike(commentId: string) {
        if (this.isLiked) return
        if (this.product) {
            const prodId = this.product._id
            this.commentsService.addLike(prodId, commentId).subscribe({
                next: resp => {
                    this.totalLikes = resp.likes
                    this.totalDislikes = resp.dislikes
                    this.isLiked = true
                    this.isDisliked = false
                },
                error: err => console.log(err)
            })
        }
    }

    addDislike(commentId: string) {
        if (this.isDisliked) return
        if (this.product) {
            const prodId = this.product._id
            this.commentsService.addDislike(prodId, commentId).subscribe({
                next: resp => {
                    this.totalDislikes = resp.dislikes
                    this.totalLikes = resp.likes
                    this.isDisliked = true
                    this.isLiked = false
                },
                error: err => console.log(err)
            })
        }
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }
}
