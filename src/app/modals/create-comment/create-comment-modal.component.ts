import { Component, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../../comment/services/comments.service';
import { ProductService } from 'src/app/product/services/product.service';
import { IComment } from '../../comment/services/comments.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-comment-modal',
  templateUrl: './create-comment-modal.component.html',
  styleUrls: ['./create-comment-modal.component.sass']
})
export class CreateCommentModalComponent {
    @ViewChild('fileInput') fileInput: ElementRef | undefined;
    @ViewChild('modalHeader') modalHeader!: ElementRef;
    advantages: string = ''
    disadvantages: string = ''
    raiting!: number
    raitingError: boolean = false
    textarea: string = ''
    textareaError: boolean = false
    selectedFileUrls: any[] = []

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public commentsService: CommentsService, 
        public authService: AuthService,
        public modalService: ModalService,
        private productService: ProductService) {}

    sendComment(form: NgForm) {
        if (this.textarea.length === 0) this.textareaError = true 
        if (!this.raiting) this.raitingError = true

        if (this.textareaError || this.raitingError) {
            this.scrollToBlock()
            return 
        } 

        const data: IComment = {
            raiting: this.raiting,
            advantages: this.advantages,
            disadvantages: this.disadvantages,
            content: this.textarea,
        }

        if (this.selectedFileUrls.length > 0) {
            const urls = this.selectedFileUrls.map(item => item.url)
            data.photos = urls
        }

        const prodId = this.productService.product._id
        this.commentsService.addComment(prodId, data).subscribe({
            next: response => {
                this.modalService.closeDialog()
                this.modalService.openDialog('thanks-modal')
                this.productService.getCurrentProduct(prodId)
            },
            error: error => console.log(error)
        })
    }

    handleFileChange(event: any) {
        this.commentsService.uploadPhoto(event.target.files[0]).subscribe({
            next: resp => {
                const obj = {
                    url: resp.url,
                    rotate: 0
                }
                this.selectedFileUrls.push(obj) 
            } 
        })
    }

    closeDialog() {
        this.modalService.closeDialog()
    }

    onAdvantagesValue(e: any) {
        this.advantages = e
    }

    onDisadvantagesValue(e: any) {
        this.disadvantages = e
    }

    onRaitingValue(raiting: any) {
        this.raiting = raiting+1
        if (this.raiting !== undefined) {
            this.raitingError = false
        }
    }

    onTextAreaValue(e: any) {
        this.textarea = e
        if (this.textarea.length > 2) {
            this.textareaError = false
        } else {
            this.textareaError = true
        }
    }

    scrollToBlock() {
        if (isPlatformBrowser(this.platformId)) {
            this.modalHeader.nativeElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    removePhoto(i: number) {
        this.selectedFileUrls = this.selectedFileUrls.filter((file, index) => index !== i )
    }

    rotatePhoto(i: number) {
        const imageToRotate = this.selectedFileUrls.find((item, index) => index === i)
        if (imageToRotate.rotate === 360) {
            imageToRotate.rotate = 0
        } else {
            imageToRotate.rotate = imageToRotate.rotate + 90
        }
    }

}