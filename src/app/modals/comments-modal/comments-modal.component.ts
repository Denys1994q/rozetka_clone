import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { Slide } from 'src/app/carousel/carousel.component';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.sass']
})
export class CommentsModalComponent {
  productName!: string
  activeSlide!: number
  constructor(private modalService: ModalService, @Inject(MAT_DIALOG_DATA) public data: any, public ProductService: ProductService) {}

  closeDialog() {
    this.modalService.closeDialog()
  }

  slides: Slide[] = this.data.slides.map((item: any) => {
    return {url: item.photo}
  })

  receiveActiveSlideIndex = ($event: any) => {
    this.activeSlide = $event
  }

}
