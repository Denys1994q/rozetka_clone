import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { IComment } from 'src/app/comment/models/comment.model';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/product/models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject } from 'rxjs';
import { CommentVotingService } from 'src/app/comment/services/comment-voting.service';

interface ISlideComment extends IComment {
    url: string
}

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.sass']
})
export class CommentsModalComponent {
    productName!: string
    activeSlide!: number
    product: IProduct | null = null
    slides!: ISlideComment[] 
    unsubscribe$ = new Subject<void>()

    constructor(
        private modalService: ModalService, 
        private commentVotingService: CommentVotingService,
        @Inject(MAT_DIALOG_DATA) public data: {startSlideIndex: number, prodId: string}, 
        private cd: ChangeDetectorRef,
        public productService: ProductService) {
            this.productService.comments$.pipe(takeUntilDestroyed()).subscribe(comments => {
                const f = comments.filter(c => c.photos.length > 0)
                this.slides = f.map((c: any) => {
                    return {...c, url: c.photos[0]}
                })
            })
        }

    ngAfterViewInit() {
        this.cd.detectChanges()
    }

    closeDialog() {
        this.modalService.closeDialog()
    }

    receiveActiveSlideIndex = ($event: any) => {
        this.activeSlide = $event
    }

    onCommentLikeBtnClick(commentId: string) {
       this.commentVotingService.addLike(commentId, this.data.prodId)
    }

    onCommentDislikeBtnClick(commentId: string) {
        this.commentVotingService.addDislike(commentId, this.data.prodId)
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
