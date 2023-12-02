import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { WishlistService } from './cabinet/services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {

    constructor(
        private router: Router, 
        private wishlistService: WishlistService,
        private authService: AuthService ) {
        router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                if (event.url === '/checkout') {
                    this.showFooter = false
                    this.showHeader = false
                }
                else if (event.url === '/') {
                    this.showFooter = false
                    this.showHeader = true
                } else {
                    this.showFooter = true
                }
            });
    }

    showFooter: boolean = true
    showHeader: boolean = true

    ngOnInit(): void {
        this.authService.getUser().subscribe({
            next: user => this.wishlistService.setWishlistItems(user.wishlist),
            error: (error) => {
                console.log('Помилка при виконанні запиту:', error.error.message);
            }
        })
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('side-banner', 'active')
        }
    }

}

