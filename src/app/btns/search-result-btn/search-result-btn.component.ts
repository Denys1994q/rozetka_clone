import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CommentsService } from 'src/app/comment/services/comments.service';

@Component({
  selector: 'app-search-result-btn',
  templateUrl: './search-result-btn.component.html',
  styleUrls: ['./search-result-btn.component.sass']
})
export class SearchResultBtnComponent {
    @Input() cancelBtn: boolean = false
    @Input() text!: string 
    @Output() clearAllClicked = new EventEmitter<void>();

    constructor(
        private SearchResultsService: SearchResultsService, 
        private CommentsService: CommentsService) {}

    cancelAll() {
        this.clearAllClicked.emit();
        if (this.CommentsService.comments$) {
            this.CommentsService.setActiveFilter(0)
        }
        this.SearchResultsService.removeAll()
    }

    cancelOne(input: string) {
        // якщо запускаємо сервіс зі сторінки відгуків продукту, розділу фільтрів 
        if (input.indexOf('Оцінка користувачів') > -1) {
            this.CommentsService.setActiveFilter(0)
            // this.CommentsService.resetSortType()
            this.SearchResultsService.removeOne(input, true)
        } 
        this.SearchResultsService.removeOne(input)
    }

}
