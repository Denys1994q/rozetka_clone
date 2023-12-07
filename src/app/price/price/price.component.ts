import { Component, Input } from '@angular/core';

type Price  = {
  old?: null | number,
  new: number
}

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent {
  @Input() price!: Price
  @Input() big: boolean = false
}
