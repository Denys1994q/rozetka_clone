import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID   } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { Slide } from 'src/app/carousel/carousel.component';
import { ApiService } from '../../services/api.service';
import { ProductService } from 'src/app/product/services/product.service';
import { CartService } from 'src/app/cart/services/cart.service';``
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {
    private readonly ALL_CATEGORIES_KEY: any = makeStateKey<any[]>('allCategories');

    constructor(
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: Object,
        public modalService: ModalService, 
        public productService: ProductService, 
        public apiService: ApiService,
        private elementRef: ElementRef,
        public cartService: CartService)
    {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
          this.observeNewProds();
        }
    }

    observeNewProds() {
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.5 
        };
        const callback = (entries: any, observer: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
            if (entry.target.classList.contains('newProds')) {
                this.productService.getNewProducts()
            } else if (entry.target.classList.contains('moreProds')) {
                this.productService.getMoreProducts()
            } else if (entry.target.classList.contains('recommendedProds')) {
                this.productService.getRecommendedProducts()
            }
            observer.unobserve(entry.target); 
            }
        });
        };
        const observer = new IntersectionObserver(callback, options);
        const target1 = this.elementRef.nativeElement.querySelector('.moreProds'); 
        const target2 = this.elementRef.nativeElement.querySelector('.newProds'); 
        const target3 = this.elementRef.nativeElement.querySelector('.recommendedProds'); 
        observer.observe(target1);
        observer.observe(target2);
        observer.observe(target3);
    }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.apiService.getAllCategories().subscribe({
                next: data => {
                    this.productService.setAllCategories(data)
                    this.transferState.set(this.ALL_CATEGORIES_KEY, data)
                },
                error: error => console.log(error)
            })
        }
        else {
            const cachedCategories = this.transferState.get<any>(this.ALL_CATEGORIES_KEY, null);
            if (cachedCategories) {
                this.productService.setAllCategories(cachedCategories)
            } else {
                this.productService.getAllCategories()
            }
            this.cartService.getCart()
        }
    }


    slides: Slide[] = [
        {
            url: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1700725118/35596279411_kjmntc.webp',
            url_mobile: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1697562054/3_mobile_11zon_yyt5rm.webp',
            url_tablet: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1697555622/355962794-min_11zon_l6q8uj.webp'
        },
        {
            url: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1697442953/372219090-min_jciasj.webp',
            url_mobile: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1697562141/1_mobile_11zon_wj2jjf.webp',
            url_tablet: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1697555193/372219090-min_11zon_i3q2nd.webp'
        },
        {
            url: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1700724769/379781022_11zon_p5goyg.webp',
            url_mobile: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1700729621/379781047_11zon_vfo6mi.webp',
            url_tablet: 'https://res.cloudinary.com/dw60kllwn/image/upload/v1700724769/379781022_11zon_p5goyg.webp'
        },
    ]

    openDialog() {
        this.modalService.closeDialog()
        this.modalService.openDialog('login')
    }
  
}
