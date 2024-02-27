import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IComment } from "../models/comment.model";
import { ModalService } from "src/app/modals/modal.service";
import { CommentsService } from "../services/comments.service";
import { SearchResultsService } from "src/app/categories/services/search-results.service";

@Component({
    selector: 'app-comments-filter-panel',
    templateUrl: './comments-filter-panel.component.html',
    styleUrls: ['./comments-filter-panel.component.sass']
})
export class CommentsFiltersPanelComponent {
    @Input() commentsFromApi: IComment[] = []
    @Output() commentsPanelLikeBtnClick = new EventEmitter<string>();
    @Output() commentsPanelDislikeBtnClick = new EventEmitter<string>();
    comments$ = this.commentsService.comments$ 

    constructor(
        private modalService: ModalService, 
        public SearchResultsService: SearchResultsService, 
        public commentsService: CommentsService) {}

    ngOnChanges() {
        if (this.commentsFromApi) {
            this.commentsService.setComments(this.commentsFromApi)
        }
    }

    openDialog(type: string) {
        this.modalService.openDialog(type)
    }

    onSelectChange(sortType: string) {
        this.commentsService.setSortOption(sortType)
    }

    onWatchAllComments() {
        this.commentsService.setActiveFilter(0)
        this.SearchResultsService.selectedInputs = []
    }

    onCommentLikeBtnClick(commentId: string) {
        this.commentsPanelLikeBtnClick.emit(commentId)
    }

    onCommentDislikeBtnClick(commentId: string) {
        this.commentsPanelDislikeBtnClick.emit(commentId)
    }

}