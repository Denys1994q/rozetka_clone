import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  @Input() options!: string[]
  @Input() name!: string
  @Input() activeOption!: any
  @Output() selectChangeEvent = new EventEmitter<any>();

  selectChange() {
    this.selectChangeEvent.emit(this.activeOption)
  }
}
