import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ServicesModalComponent } from './services-modal/services-modal.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { FiltersModalComponent } from './filters-modal/filters-modal.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Injectable({ providedIn: 'root' })

export class ModalService {
    openedDialog:Subject<any> = new Subject<any>();
    data!: any

    constructor(public dialog: MatDialog) {}
    
    getData(data: any) {
      this.data = data
    }

    openDialog(variant: string) {
        let modalVariant: any
        let modalStyles: Object = {}
        switch (variant) {
            case 'product': 
                if (variant == 'product') {
                    modalVariant = ProductsModalComponent
                    modalStyles = {
                      panelClass: 'modal-products',
                      data: this.data
                    }
                } 
                break
            case 'login': 
                if (variant == 'login') {
                    modalVariant = LoginModalComponent
                    modalStyles = {
                      panelClass: 'modal-login',
                    }
                }
                break
            case 'register': 
                if (variant == 'register') {
                    modalVariant = RegisterModalComponent
                    modalStyles = {
                      panelClass: 'modal-register',
                    }
                }
                break
            case 'services': 
                if (variant == 'services') {
                    modalVariant = ServicesModalComponent
                    modalStyles = {
                      panelClass: 'modal-services',
                      paddingBottom: 0
                    }
                }
                break
            case 'comments': 
                if (variant == 'comments') {
                    modalVariant = CommentsModalComponent
                    modalStyles = {
                      panelClass: 'modal-comments',
                      width: '90vw',
                      maxWidth: '90vw',
                      minHeight: '500px',
                      data: this.data
                    }
                }
                break
            case 'filters': 
                if (variant == 'filters') {
                    modalVariant = FiltersModalComponent
                    modalStyles = {
                      panelClass: 'modal-filters',
                    }
                }
                break
            case 'cart': 
                if (variant == 'cart') {
                    modalVariant = CartModalComponent
                    modalStyles = {
                      panelClass: 'modal-cart',
                      maxWidth: '90vw',
                    }
                }
                break
        }
        this.openedDialog.next(variant)
        const dialogRef = this.dialog.open(modalVariant, modalStyles);
        dialogRef.afterClosed().subscribe(result => {
          this.openedDialog.next(false)
        });
      }

      closeDialog() {
        this.dialog.closeAll()
      }
}