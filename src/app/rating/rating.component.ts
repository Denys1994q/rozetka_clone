import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass']
})
export class RatingComponent {
  @Input() activeIconIndex: any = null
  @Input() fixed: boolean = false
  @Input() numReviews!: any

  icon: string = 'star_border'
  icons = [1,2,3,4,5]
  clicked!: number 

  fillStar(i: number) {
    this.activeIconIndex = i
  }

  removeStar() {
    this.activeIconIndex = this.clicked
  }

  fixStar(i: number) {
    this.clicked = i
    this.fillStar(i)
  }

  showIcon(i: number) {
    if (i <= this.activeIconIndex && (this.activeIconIndex || this.activeIconIndex == 0) ) {
      return 'star'
    } else {
      return 'star_border'
    }
  }

  ngOnInit() {
    this.activeIconIndex = this.activeIconIndex -1
  }
}
