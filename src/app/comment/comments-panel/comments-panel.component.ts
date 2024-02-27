import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from '../models/comment.model';
import { ModalService } from 'src/app/modals/modal.service';
import { CommentsService } from '../services/comments.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comments-panel',
  templateUrl: './comments-panel.component.html',
  styleUrls: ['./comments-panel.component.sass']
})
export class CommentsPanelComponent {
    @Input() comments: IComment[] = []
    @Input() link!: any 
    @Output() commentsPanelLikeBtnClick = new EventEmitter<string>();
    @Output() commentsPanelDislikeBtnClick = new EventEmitter<string>();

    unsubscribe$ = new Subject<void>()

    constructor(
        private modalService: ModalService, 
        public commentsService: CommentsService) {}

    openDialog(type: string) {
        this.modalService.openDialog(type)
    }

    onCommentLikeBtnClick(commentId: string) {
        this.commentsPanelLikeBtnClick.emit(commentId)
    }

    onCommentDislikeBtnClick(commentId: string) {
        this.commentsPanelDislikeBtnClick.emit(commentId)
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
  
}
