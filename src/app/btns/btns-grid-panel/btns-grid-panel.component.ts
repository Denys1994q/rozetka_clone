import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btns-grid-panel',
  templateUrl: './btns-grid-panel.component.html',
  styleUrls: ['./btns-grid-panel.component.sass']
})
export class BtnsGridPanelComponent {
  btns: any = [{icon: 'view_module', name: 'big'}, {icon: 'apps',  name: 'small'}]
  activeBtn: string = 'small'
  @Output() btnsGridPanelChange = new EventEmitter<string>();

  ngOnInit() {
    this.btnsGridPanelChange.emit(this.activeBtn)
  }

  chooseBtn(index: string) {
    this.activeBtn = index
    this.btnsGridPanelChange.emit(this.activeBtn)
  }
}
