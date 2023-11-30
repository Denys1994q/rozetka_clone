import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent {
    server: boolean = false

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.server = true
        }
    }

}