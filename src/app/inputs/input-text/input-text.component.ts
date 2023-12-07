import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.sass']
})
export class InputTextComponent {
  @Input() inpVal: string = ''
  @Output() inputValue = new EventEmitter<string>();

  resetValue() {
    this.inpVal = ''
    this.getValue()
  }

  getValue() {
    this.inputValue.emit(this.inpVal);
  }

  ngOnInit() {
    this.getValue()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getValue()
  }
}
