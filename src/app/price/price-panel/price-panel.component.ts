import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.sass']
})
export class PricePanelComponent {
  start!: number
  end!: number 
  priceString!: string
  @Input() startStaticPrice!: number
  @Input() endStaticPrice!: number
  @Output() pricePanelChange = new EventEmitter<any>();

  constructor(public SearchResultsService: SearchResultsService) {
    this.SearchResultsService.resetPriceValue.subscribe(status => {
      if (status) {
        this.reset()
      }
    });

  }

  ngOnInit() {
    this.start = this.startStaticPrice
    this.end = this.endStaticPrice
  }

  setMinValue(e: any) {
    this.start = e.target.value
  }

  setMaxValue(e: any) {
    this.end = e.target.value
  }

  onSubmitPrice() {
    this.priceString = this.start.toString() + ' - ' + this.end.toString() + ' грн'
    this.pricePanelChange.emit(this.priceString)
  }

  reset() {
    this.start = this.startStaticPrice
    this.end = this.endStaticPrice
  }

}
