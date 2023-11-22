import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.sass']
})
export class SkeletonComponent {
    @Input() variant!: string
    mobile: boolean = false

    ngOnInit() {
        if (window.innerWidth < 700) {
            this.mobile = true
        }
    }

}
