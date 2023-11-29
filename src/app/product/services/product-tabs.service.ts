import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ProductTabsService {
    baseView: boolean = false

    setBaseView(value: boolean) {
        this.baseView = value
    }

}