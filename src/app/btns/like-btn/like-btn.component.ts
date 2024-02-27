import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Subject} from "rxjs";

@Component({
    selector: 'app-like-btn',
    templateUrl: './like-btn.component.html',
    styleUrls: ['./like-btn.component.sass']
  })
export class LikeBtnComponent {
    @Input() isLiked!: number 
    @Input() totalLikes!: number
    @Output() likeBtnClick = new EventEmitter();
    unsubscribe$ = new Subject<void>()

    addLike() {
        if (this.isLiked === 1) return
        this.likeBtnClick.emit()
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
