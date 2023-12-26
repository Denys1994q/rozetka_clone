import { Component } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.sass']
})
export class CabinetPage {

    constructor(private scrollService: ScrollService) {}

    ngOnInit() {
        this.scrollService.scrollToTop()
    }

}