import { Component } from '@angular/core';
import { MenuService } from 'src/app/core/components/side-menu/menu.service';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  openedDialog!: any

  constructor(
    public menuService: MenuService, 
    public modalService: ModalService, 
    public authService: AuthService,
    public cartService: CartService 
  ) {}

  ngOnInit() {
    this.modalService.openedDialog.subscribe(data=>{
      this.openedDialog = data;
    });
    this.cartService.getCart()
  }
  
}
