import { Component, Input } from '@angular/core';
import { Comment } from '../../../comment/comment.component';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/search/services/search-results.service';
import { ProductService } from '../../services/product.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments-panel',
  templateUrl: './comments-panel.component.html',
  styleUrls: ['./comments-panel.component.sass']
})
export class CommentsPanelComponent {

  constructor(
    private modalService: ModalService, 
    public SearchResultsService: SearchResultsService, 
    public ProductService: ProductService,
    public CommentsService: CommentsService) {}

  @Input() comments: Comment[] = []
  @Input() withFilters: boolean = false
  @Input() link!: any 

  ngOnInit() {
    this.SearchResultsService.removeAll()
  }

  openDialog(type: string) {
    this.modalService.openDialog(type)
  }

  onSelectChange(sortType: string) {
    this.CommentsService.sortProdComments(sortType)
  }
  
}
