import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CommentsService } from 'src/app/comment/services/comments.service';

type RaitingItem = {
  label: string,
  icons: number[]
}

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.sass']
})
export class FiltersModalComponent {
    items: RaitingItem[] = [
        {label: '1 зірка', icons: [1]},
        {label: '2 зірки', icons: [1,2]},
        {label: '3 зірки', icons: [1,2,3]},
        {label: '4 зірки', icons: [1,2,3,4]},
        {label: '5 зірок', icons: [1,2,3,4,5]}
    ]
    selectedRaitingIndex!: number 

    constructor(
        private modalService: ModalService, 
        public commentsService: CommentsService, 
        public searchResultsService: SearchResultsService) {}

    setRaiting(selectedRaitingIndex: number) {
        this.selectedRaitingIndex = this.items[selectedRaitingIndex].icons[selectedRaitingIndex]
    }

    filterProducts() {
        this.modalService.closeDialog()
        this.commentsService.setActiveFilter(this.selectedRaitingIndex)
        this.searchResultsService.addInputComment(`Оцінка користувачів: ${this.selectedRaitingIndex}`, this.selectedRaitingIndex)
    }

    closeDialog() {
        this.modalService.closeDialog()
    }

    ngOnDestroy() {
        this.searchResultsService.selectedRaitingIndex = 0
    }

}
