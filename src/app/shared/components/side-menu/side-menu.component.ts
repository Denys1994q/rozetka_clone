import { Component } from '@angular/core';
import { MenuService } from 'src/app/shared/components/side-menu/menu.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { SearchResultsService } from 'src/app/search/services/search-results.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent {
  activeSearchParam!: any
  // showCancelBtn: boolean = false

  constructor(
    public menuService: MenuService, 
    public modalService: ModalService,
    public searchResultsService: SearchResultsService,
    public authService: AuthService,
    private router: Router
  ) {}

  showCancelBtn() {
    console.log(this.activeSearchParam, 'this.activeSearchParam')
    if (this.searchResultsService.selectedInputs.length > 0) {
      return this.searchResultsService.selectedInputs.find(item => item.title === this.activeSearchParam.title)
    } else {
      return false
    }
  }

  showCancelAllBtn() {
    if (this.searchResultsService.selectedInputs.length > 0) {
      return true
    } else {
      return false
    }
  }

  openProductsDialog() {
    this.modalService.openDialog('product')
    this.menuService.closeMenu()
  }

  closePrev(searchParam: any) {
    this.activeSearchParam = searchParam
    this.menuService.closeMenu()
    this.menuService.openMenu('search-deep') 
  }

  onPricePanelChange(val: any) {
    this.searchResultsService.addInput(val)
  }

  resetOne(searchParam: any) {
    searchParam.options.map((option: any) => {
      this.searchResultsService.removeOne(option.label)
    })
  }

  resetAll() {
    this.searchResultsService.removeAll()
  }

  getNumActiveOptions(activeSearchParam: any) {
    if (this.searchResultsService.selectedInputs.length > 0) {
      return this.searchResultsService.selectedInputs.find(input => input.title === activeSearchParam.title).options.length
    } else {
      return false
    }
  }

  getSelectedPositions(searchParam: any) {
    if (this.searchResultsService.selectedInputs.find(item => item.title === searchParam.title)) {
      return this.searchResultsService.selectedInputs.find(item => item.title === searchParam.title).options
    } else {
      return false
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: response => {
        this.menuService.closeMenu()
      },
      error: (error) => {
        console.error('Помилка при виконанні запиту:', error);
      }
    })
  }

  openCart() {
    this.modalService.openDialog('cart')
    this.menuService.closeMenu()
  }

  onCheckboxChange(e: string) {
    this.searchResultsService.addInput(e)
  }

}