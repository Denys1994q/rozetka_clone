import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class DeviceService {
    isTabletView: boolean = false
    isMobileView: boolean = false

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    detectDevice() {
        if (isPlatformBrowser(this.platformId)) {
            if (window.innerWidth < 1200 && window.innerWidth > 700) {
                this.isTabletView = true;
            } else if (window.innerWidth < 700) {
                this.isMobileView = true;
            }
        }
    }
}