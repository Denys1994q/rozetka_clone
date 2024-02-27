import { Component, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/product/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { ModalService } from '../modal.service';
import { IProduct } from 'src/app/product/models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject, takeUntil } from 'rxjs';
import { CommentsApiService } from 'src/app/comment/services/comments-api.service';

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
    product: IProduct | null = null
    unsubscribe$ = new Subject()

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public commentsApiService: CommentsApiService, 
        public authService: AuthService,
        public modalService: ModalService,
        private productService: ProductService) {
            this.productService.product$.pipe(takeUntilDestroyed()).subscribe(prod => {
                this.product = prod.value
            })
        }

    sendComment(form: NgForm) {
        if (this.textarea.length === 0) this.textareaError = true 
        if (!this.raiting) this.raitingError = true

        if (this.textareaError || this.raitingError) {
            this.scrollToBlock()
            return 
        } 

        const data: any = {
            raiting: this.raiting,
            advantages: this.advantages,
            disadvantages: this.disadvantages,
            content: this.textarea,
        }

        if (this.selectedFileUrls.length > 0) {
            const urls = this.selectedFileUrls.map(item => item.url)
            data.photos = urls
        }

        if (this.product) {
            const prodId = this.product._id
            this.commentsApiService.addComment(prodId, data).pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: response => {
                    this.modalService.closeDialog()
                    this.modalService.openDialog('thanks-modal')
                    this.productService.getProduct(prodId)
                },
                error: error => console.log(error)
            })
        }
    }

    handleFileChange(event: any) {
        this.commentsApiService.uploadPhoto(event.target.files[0]).pipe(takeUntil(this.unsubscribe$)).subscribe({
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