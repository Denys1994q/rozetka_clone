import { Component } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.sass']
})
export class CabinetPage {

    ngOnInit() {
        if (typeof window !== 'undefined') {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }

}