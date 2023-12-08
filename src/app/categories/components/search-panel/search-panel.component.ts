import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.sass']
})
export class SearchPanelComponent {
  showLess: boolean = true
  activeTitle: boolean = false
  activeIndexArr: number[] = []
  activeTitleIndex!: number | null 
  @Input() data!: any
  @Input() priceDataStart!: any
  @Input() priceDataEnd!: any
  brendData: any = []
  @Output() searchPanelChange = new EventEmitter<any>();

  getBrends() {
    return this.brendData = this.data.filter((item: any) => item.title === 'Бренд')[0].options
  }
 
  openBlock(i: number) {
    if ( this.activeIndexArr.indexOf(i) === -1) {
      this.activeIndexArr.push(i)
    } else {
      this.activeIndexArr = this.activeIndexArr.filter(item => item !== i)
    }
  }

  makeActiveTitle(i: number) {
    this.activeTitleIndex = i
  }

  makeDisactiveTitle() {
    this.activeTitleIndex = null
  }

  onCheckboxChange(changedInput: string) {
    this.searchPanelChange.emit(changedInput)
  }

}
