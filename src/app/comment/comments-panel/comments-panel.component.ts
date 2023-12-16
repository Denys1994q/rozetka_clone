import { Component, Input } from '@angular/core';
import { Comment } from '../comment.component';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { ProductService } from '../../product/services/product.service';
import { CommentsService } from '../services/comments.service';

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
        public commentsService: CommentsService) {}

    @Input() comments: Comment[] | null = []
    @Input() withFilters: boolean = false
    @Input() link!: any 

    ngOnInit() {
        this.SearchResultsService.removeAll()
    }

    openDialog(type: string) {
        this.modalService.openDialog(type)
    }

    onSelectChange(sortType: string) {
        this.commentsService.sortProdComments(sortType)
    }


  
}
