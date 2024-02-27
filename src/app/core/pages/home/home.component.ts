import { Component, Inject, PLATFORM_ID   } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { Slide } from 'src/app/carousel/carousel.component';
import { ProductApiService } from 'src/app/product/services/product-api.service';
import { ProductsService } from 'src/app/product/services/products.service';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/core';
import { CategoriesApiService } from 'src/app/categories/services/categories-api.service';
import { ScrollService } from '../../services/scroll.service';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/app/categories/models/categories.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent  {
    private readonly ALL_CATEGORIES_KEY: any = makeStateKey<any[]>('allCategories');
    allCategories$ = new BehaviorSubject<ICategory[]>([])
    allCategoriesError: boolean = false
    newProductsError: boolean = false
    moreProductsError: boolean = false
    recommendedProductsError: boolean = false
    newProds$ = this.productsService.newProducts$
    moreProds$ = this.productsService.moreProducts$
    recommendedProds$ = this.productsService.recommendedProducts$
    prodsError$ = this.productApiService.prodsError$ 
    unsubscribe$ = new Subject<void>()
    cards = [
        { prods: this.newProds$, category: 'Гарячі новинки', className: 'newProds' },
        { prods: this.moreProds$, category: 'Більше товарів для вибору', className: 'moreProds' },
        { prods: this.recommendedProds$, category: 'Рекомендовані', className: 'recommendedProds' }
    ];

    constructor(
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: Object,
        public modalService: ModalService, 
        public productsService: ProductsService, 
        public productApiService: ProductApiService,
        private categoriesApiService: CategoriesApiService,
        private scrollService: ScrollService) {}

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.categoriesApiService.getAllCategories().pipe(takeUntil(this.unsubscribe$)).subscribe({
                next: data => {
                    this.allCategories$.next(data)
                    this.transferState.set(this.ALL_CATEGORIES_KEY, data)
                },
                error: error => this.allCategoriesError = true
            })
        }
        else {
            this.scrollService.scrollToTop()
            const cachedCategories = this.transferState.get<any>(this.ALL_CATEGORIES_KEY, null);
            if (cachedCategories) {
                this.allCategories$.next(cachedCategories)
            } else {
                this.categoriesApiService.getAllCategories().pipe(takeUntil(this.unsubscribe$)).subscribe({
                    next: data => this.allCategories$.next(data),
                    error: err => this.allCategoriesError = true
                  })
            }
        }
    }

    onIntersectionChange(className: string) {
        switch (className) {
            case 'newProds': 
                this.productsService.getNewProducts()  
                break
            case 'moreProds': 
                this.productsService.getMoreProducts()
                break
            case 'recommendedProds': 
                this.productsService.getRecommendedProducts()
                break
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

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
  
}
