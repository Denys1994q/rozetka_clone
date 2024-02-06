import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/components/side-menu/menu.service';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    openedDialog!: any
    totalProductsNumber$ = this.cartService.totalProductsNumber$
    unsubscribe$ = new Subject<void>()

    constructor(
        public menuService: MenuService, 
        public modalService: ModalService, 
        public cartService: CartService,
        public authService: AuthService) {}

    ngOnInit() {
        this.modalService.openedDialog.pipe(takeUntil(this.unsubscribe$)).subscribe(data=>{
            this.openedDialog = data;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }


}
