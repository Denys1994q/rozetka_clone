import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class ScrollService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    scrollToTop() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }

}