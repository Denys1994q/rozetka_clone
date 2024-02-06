import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.sass']
})
export class CartBtnComponent {
  @Input() withBadge!: number 

}
