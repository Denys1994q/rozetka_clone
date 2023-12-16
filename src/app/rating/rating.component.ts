import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass']
})
export class RatingComponent {
  @Input() activeIconIndex: any = null
  @Input() fixed: boolean = false
  @Input() numReviews!: any
  @Input() bigIcons: boolean = false
  @Output() raitingValue = new EventEmitter<number>();

  icon: string = 'star_border'
  icons = ['Погано', 'Так собі', 'Нормально', 'Добре', 'Чудово']
  clicked!: number 

  fillStar(i: number) {
    this.activeIconIndex = i
    this.raitingValue.emit(this.activeIconIndex);
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
