import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { CommentsService } from '../../services/comments.service';
import { ProductTabsService } from '../../services/product-tabs.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.sass']
})
export class ProductCommentsComponent {
    constructor(
        private modalService: ModalService, 
        public commentsService: CommentsService, 
        private productService: ProductService,
        private productTabsService: ProductTabsService ) {}

    commentsWithPhotoVideo: any = []
    sliderWidth!: number
    slideWidth!: number
    @ViewChild('sliderList') sliderList!: ElementRef;
    @ViewChild('sliderItem') sliderItem!: ElementRef;

    ngAfterViewInit() {
        if (this.sliderList && this.sliderItem) {
            this.sliderWidth = this.sliderList.nativeElement.offsetWidth;
            this.slideWidth = this.sliderItem.nativeElement.offsetWidth;
        }
    }

    ngOnInit() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.productService.checkActiveTab('comments')
        this.productTabsService.setBaseView(false)
        this.commentsService.sortProdComments('З фото і відео')
        this.commentsWithPhotoVideo = this.commentsService.comments.filter((item: any) => item.photo || item.video)
    }

    openDialog(type: string, i: number = 0) {
        this.modalService.getData({slides: this.commentsWithPhotoVideo, startSlideIndex: i})
        this.modalService.openDialog(type)
    }
}
