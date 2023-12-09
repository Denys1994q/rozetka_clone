import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { MenuService } from '../../../core/components/side-menu/menu.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-user-infopanel',
  templateUrl: './user-infopanel.component.html',
  styleUrls: ['./user-infopanel.component.sass']
})
export class UserInfopanelComponent {
    @Input() cabinet: boolean = false

    constructor( 
        public authService: AuthService, 
        public modalService: ModalService, 
        public menuService: MenuService) 
    {}

    openDialog() {
        this.modalService.openDialog('login')
        this.menuService.closeMenu()
      }
    
      openRegisterDialog() {
        this.modalService.openDialog('register')
        this.menuService.closeMenu()
      }
}
