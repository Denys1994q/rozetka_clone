import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { CommentsService } from 'src/app/comment/services/comments.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { ProductService } from '../../services/product.service';
import { map} from 'rxjs';
import { CommentVotingService } from 'src/app/comment/services/comment-voting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.sass']
})
export class ProductCommentsComponent {
    product!: IProduct
    comments$ = this.productService.comments$
    commentsWithPhotoVideo$ = this.comments$.pipe(
        map(comments => {
            return comments.filter(comment => comment.photos && comment.photos.length > 0)
        })
    );
    sliderWidth!: number
    slideWidth!: number
    @ViewChild('sliderList') sliderList!: ElementRef;
    @ViewChild('sliderItem') sliderItem!: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private modalService: ModalService, 
        private productService: ProductService,
        public commentsService: CommentsService, 
        private commentVotingService: CommentVotingService,
        private scrollService: ScrollService) {
            this.productService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                if (prod.value) {
                    this.product = prod.value
                }
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
    }

    ngAfterViewInit() {
        if (this.sliderList && this.sliderItem) {
            this.sliderWidth = this.sliderList.nativeElement.offsetWidth;
            this.slideWidth = this.sliderItem.nativeElement.offsetWidth;
        }
        this.cd.detectChanges()
    }

    openDialog(type: string, i: number = 0) {
        this.modalService.getData({startSlideIndex: i, prodId: this.product._id})
        this.modalService.openDialog(type)
    }

    onCommentsPanelLikeBtnClick(commentId: string) {
        this.commentVotingService.addLike(commentId, this.product._id)
    }

    onCommentsPanelDislikeBtnClick(commentId: string) {
        this.commentVotingService.addDislike(commentId, this.product._id)
    }

    ngOnDestroy() {
        this.commentsService.resetOptions()
    }
 
}
