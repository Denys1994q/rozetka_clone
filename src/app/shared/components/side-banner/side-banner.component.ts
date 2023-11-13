import { Component } from '@angular/core';

@Component({
  selector: 'app-side-banner',
  templateUrl: './side-banner.component.html',
  styleUrls: ['./side-banner.component.sass']
})
export class SideBannerComponent {
    showBanner!: boolean
    timeoutId!: ReturnType<typeof setTimeout>;

    ngOnInit() {
        const isActive = localStorage.getItem('side-banner')
        if (isActive) {
            this.timeoutId = setTimeout(() => {
                this.showBanner = true
            }, 2000)
        }
    }
    

    closeBanner() {
        this.showBanner = false
    }

    ngOnDestroy() {
        localStorage.removeItem('side-banner')
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

}
