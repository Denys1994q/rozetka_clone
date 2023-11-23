import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.sass']
})
export class SkeletonComponent {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    
    @Input() variant!: string
    tablet: boolean = false
    mobile: boolean = false  
    onServer: boolean = false  

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (window.innerWidth < 1200 && window.innerWidth > 700) {
                this.tablet = true;
            } else if (window.innerWidth < 700) {
                this.mobile = true;
            }
        } else {
            this.onServer = true
        }
    }

}
