import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-input-searchBox',
  templateUrl: './input-searchBox.component.html',
  styleUrls: ['./input-searchBox.component.sass']
})
export class InputSearchBoxComponent {
  searchInpValue: string = ''
  showOverlay: boolean = false

  constructor(private router: Router,  public ProductService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeAndReset()
        this.showOverlay = false
      }
    });
  }

  findProd() {
    if (!this.searchInpValue) {
      this.closeAndReset()
    } else {
      this.showOverlay = true
      this.ProductService.findProduct(this.searchInpValue)
    } 
    
  }

  closeAndReset() {
    this.searchInpValue = ''
    this.ProductService.resetFoundedProducts()
  }
}
