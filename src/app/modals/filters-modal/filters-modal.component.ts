import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { ProductService } from 'src/app/product/services/product.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { CommentsService } from 'src/app/product/services/comments.service';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.sass']
})
export class FiltersModalComponent {
  items: any[] = [
    {label: '1 зірка', icons: [1]},
    {label: '2 зірки', icons: [1,2]},
    {label: '3 зірки', icons: [1,2,3]},
    {label: '4 зірки', icons: [1,2,3,4]},
    {label: '5 зірок', icons: [1,2,3,4,5]}
  ]
  selectedRaitingIndex!: number 

  constructor(
    private modalService: ModalService, 
    public ProductService: ProductService, 
    public CommentsService: CommentsService, 
    public SearchResultsService: SearchResultsService) {}

  setRaiting(selectedRaitingIndex: number) {
    this.selectedRaitingIndex = this.items[selectedRaitingIndex].icons[selectedRaitingIndex]
  }

  filterProducts() {
    this.modalService.closeDialog()
    this.CommentsService.filterProdComments(this.selectedRaitingIndex)
    this.SearchResultsService.addInputComment(`Оцінка користувачів: ${this.selectedRaitingIndex}`, this.selectedRaitingIndex)
  }

  closeDialog() {
    this.modalService.closeDialog()
  }

}
