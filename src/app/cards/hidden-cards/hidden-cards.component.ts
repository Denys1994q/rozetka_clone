import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, ElementRef  } from "@angular/core"
import { IProduct } from "src/app/product/models/product.model"
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-hidden-cards',
    templateUrl: './hidden-cards.component.html',
    styleUrls: ['./hidden-cards.component.sass']
  })
export class HiddenCardsComponent {
    @Input() prods!: IProduct[] | null
    @Input() category!: string
    @Input() className!: string
    @Output() isIntersectedChange = new EventEmitter<string>();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object, 
        private elementRef: ElementRef) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
          this.observeNewProds();
        }
    }

    observeNewProds() {
        const options = {root: null, rootMargin: '0px', threshold: 0.5};
        const callback = (entries: any, observer: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains(this.className)) {
                        this.isIntersectedChange.emit(this.className)
                    } 
                    observer.unobserve(entry.target); 
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        const target = this.elementRef.nativeElement.querySelector(`.${this.className}`); 
        observer.observe(target);
    }

}
  