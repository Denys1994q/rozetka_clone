import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from './models/comment.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent {
    @Input() comment!: IComment
    @Output() commentLikeBtnClick = new EventEmitter<string>();
    @Output() commentDislikeBtnClick = new EventEmitter<string>();
    unsubscribe$ = new Subject<void>()

    onLikeBtnClick() {
        this.commentLikeBtnClick.emit(this.comment._id);
    }

    onDislikeBtnClick() {
        this.commentDislikeBtnClick.emit(this.comment._id);
    }
    
    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
