import { Injectable } from "@angular/core";
import { CommentsApiService } from "./comments-api.service";
import { ProductService } from "src/app/product/services/product.service";

@Injectable({ providedIn: 'root' })

export class CommentVotingService {

    constructor(
        private commentsApiService: CommentsApiService,
        private productService: ProductService) {}
    
    addLike(commentId: string, prodId: string) {
        this.commentsApiService.addLike(prodId, commentId).subscribe({
            next: resp => {
                this.productService.updateProdComments(commentId, resp.comment, 1)
            },
            error: err => console.log(err)
        })
    }

    addDislike(commentId: string, prodId: string) {
        this.commentsApiService.addDislike(prodId, commentId).subscribe({
            next: resp => {
                this.productService.updateProdComments(commentId, resp.comment, -1)
            },
            error: err => console.log(err)
        })
    }

}