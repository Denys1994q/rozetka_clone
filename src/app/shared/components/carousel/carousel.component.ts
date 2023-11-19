import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { AfterViewInit, AfterContentChecked, OnDestroy, Input, OnInit, OnChanges, SimpleChanges, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export type Slide = {
    url?: string,
    url_mobile?: string,
    url_tablet?: string,
    video_url?: string,
    video_youtubeUrl?: string,
    video_screen?: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements  OnDestroy {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    @Input() slidesArr!: Slide[]
    @Input() show_btns: boolean = true
    @Input() show_indicators: boolean = true
    @Input() extended: boolean = false
    @Input() extendedBig: boolean = false
    @Input() extendedBigWide: boolean = false
    @Input() startSlideIndex: any
    @Input() autoSlidesOpening: boolean = false
    @Output() activeSlideEvent = new EventEmitter<any>()
    @ViewChild('slideImg') slideImg!: ElementRef;
    @ViewChild('row_list') row_list!: ElementRef;
    @ViewChildren("row_item", { read: ElementRef }) elements!: QueryList<ElementRef>;

    slideWidth!: number
    slideHeight!: number
    counter: number = 0
    val: number = 0
    res: any 
    int: any

    showPrev() {
        if (this.counter <= 0) {
        this.counter = this.slidesArr.length
        }
        this.counter--
        this.val = this.res * this.counter

        this.activeSlideEvent.emit(this.counter)
    }

    showNext() {
        if (this.counter >= this.slidesArr.length-1) {
        this.counter = -1
        }
        this.counter++
        this.val = this.res * this.counter

        this.activeSlideEvent.emit(this.counter)
    }

    st() {
        this.res = - this.slideImg.nativeElement.offsetWidth;
        this.slideWidth = this.slideImg.nativeElement.offsetWidth;
        this.slideHeight = this.slideImg.nativeElement.offsetHeight;
        if (this.autoSlidesOpening) {
        this.int = setInterval(() => {
            this.showNext()
        }, 4000)
        }
    }

    ngAfterViewInit () {
        if (!isPlatformServer(this.platformId)) {
            this.st()
            if (this.startSlideIndex) {
                this.activeSlideEvent.emit(this.startSlideIndex)
                this.selectSlide(this.startSlideIndex)
            }
        }
    }

    stopCarousel() {
        clearInterval(this.int);
    }

    continueCarousel() {
        this.st()
    }

    ngOnDestroy() {
        clearInterval(this.int);
    }

    selectSlide(i: number) {
        this.scrollRow(i)

        this.counter = i
        this.val = this.res * this.counter
    }

    scrollRow(i: number) {
        if (this.elements) {
        this.elements.forEach((element, index) => {
            if (i === index) {
            element.nativeElement.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });        
            }
        });
        }
    }

    generateSrcset(slide: any): string {
        const srcset = [
        `${slide.url_mobile} 376w`,
        `${slide.url_mobile} 430w`,
        `${slide.url_tablet ? slide.url_tablet : slide.url} 800w`,
        `${slide.url} 1400w`,
        ];
        return srcset.join(', ');
    }

}
