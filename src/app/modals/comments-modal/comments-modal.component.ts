import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { Slide } from 'src/app/carousel/carousel.component';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/product/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.sass']
})
export class CommentsModalComponent {
  productName!: string
  activeSlide!: number
  product: IProduct | null = null
  productSubscription!: Subscription

  constructor(
        private modalService: ModalService, 
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public ProductService: ProductService) {
            this.productSubscription = this.ProductService.product$.subscribe(prod => {
                this.product = prod
            })
        }

  closeDialog() {
    this.modalService.closeDialog()
  }

  slides: Slide[] = this.data.slides.map((item: any) => {
    return {url: item.photo}
  })

  receiveActiveSlideIndex = ($event: any) => {
    this.activeSlide = $event
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
}

}
