import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Slide } from 'src/app/carousel/carousel.component';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { IProduct, IProductCart } from '../../models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject } from 'rxjs';
import { CommentVotingService } from 'src/app/comment/services/comment-voting.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.sass']
})
export class ProductAllComponent {
    comments$ = this.productService.comments$
    showFullText: boolean = false
    hideBtn: boolean = false
    slides: Slide[] = []
    product!: IProduct 
    isInWishlist!: boolean
    unsubscribe$ = new Subject<void>()
    @ViewChild('videoBlock') videoBlock!: ElementRef;
    @ViewChild('characteristicsAndReviewsBlock') characteristicsAndReviewsBlock!: ElementRef;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public authService: AuthService,
        public productService: ProductService, 
        public cartService: CartService, 
        private scrollService: ScrollService,
        private commentVotingService: CommentVotingService,
        public modalService: ModalService) {
            this.productService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                if (prod.value) {
                    this.product = prod.value
                }
            })
        }

    ngOnInit() {
        this.scrollService.scrollToTop()
    }

    showFullBlock() {
        this.showFullText = true
        this.hideBtn = true
    }

    scrollToBlock(block: string) {
        if (isPlatformBrowser(this.platformId)) {
            if (block === 'videoBlock') {
                this.videoBlock.nativeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else if (block === 'characteristicsAndReviewsBlock') {
                this.characteristicsAndReviewsBlock.nativeElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }

    onCommentsPanelLikeBtnClick(commentId: string) {
        this.commentVotingService.addLike(commentId, this.product?._id)
    }

    onCommentsPanelDislikeBtnClick(commentId: string) {
        this.commentVotingService.addDislike(commentId, this.product?._id)
    }

    addToCart() {
        if (this.product) {
            const data: IProductCart = {...this.product, amount: 1}
            this.cartService.addToShoppingCart(data)  
        }
    }
 
    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
