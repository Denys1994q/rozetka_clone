import { Component, Input } from '@angular/core';

export type CategoryItem = {
  name?: string,
  img?: string,
  subitems?: any[],
  engName?: string,
  id?: string
}

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.sass']
})
export class CategoryCardComponent {
  @Input() data!: CategoryItem
}
