import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.sass']
})
export class CounterComponent {
    @Input() productId!: string; 
    @Input() startValue!: number; 
    @Output() counterChange: EventEmitter<any> = new EventEmitter<any>();

    decrease() {
        this.startValue = this.startValue - 1
        this.emitCounterChange()
    }

    increase() {
        this.startValue = this.startValue + 1
        this.emitCounterChange()
    }

    emitCounterChange() {
        this.counterChange.emit({ productId: this.productId, value: this.startValue });
    }

}