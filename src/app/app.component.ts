import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import {filter} from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { WishlistService } from './cabinet/services/wishlist.service';
import { DeviceService } from './core/services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
    showFooter: boolean = true
    showHeader: boolean = true

    constructor(
        private router: Router, 
        private wishlistService: WishlistService,
        private deviceService: DeviceService,
        private authService: AuthService ) {
            router.events.pipe(filter(event => event instanceof NavigationEnd))
                .subscribe({
                    next: (event: Event ) => {
                        if(event instanceof NavigationEnd ){
                            if (event.url === '/checkout') {
                                this.showFooter = false;
                                this.showHeader = false;
                            } else if (event.url === '/') {
                                this.showFooter = false;
                                this.showHeader = true;
                            } else {
                                this.showFooter = true;
                            }
                        }
                    }
                });
    }

    ngOnInit(): void {
        this.authService.getUser().subscribe({
            next: user => this.wishlistService.setWishlistItems(user.wishlist),
            error: error => console.log('Помилка при виконанні запиту:', error.error.message)
        })
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('side-banner', 'active')
        }
        this.deviceService.detectDevice()
    }

}

