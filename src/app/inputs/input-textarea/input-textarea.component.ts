import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.sass']
})
export class InputTextareaComponent {
    @Input() inpVal: string = ''
    @Input() placeholder: string = ''
    @Input() label: string = ''
    @Input() name: string = ''
    @Input() textareaError: boolean = false
    @Output() textareaValue = new EventEmitter<string>();

    getValue() {
        this.textareaValue.emit(this.inpVal);
    }

}
