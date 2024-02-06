import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IProduct } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.sass']
})
export class CounterComponent {
    @Input() product!: IProduct; 
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
        this.counterChange.emit({ product: this.product, value: this.startValue });
    }

}