import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: 'app-dislike-btn',
    templateUrl: './dislike-btn.component.html',
    styleUrls: ['./dislike-btn.component.sass']
  })
export class DislikeBtnComponent {
    @Input() totalDislikes!: number
    @Input() isLiked!: number
    @Output() dislikeBtnClick = new EventEmitter();
    unsubscribe$ = new Subject<void>()
    
    addDislike() {
        if (this.isLiked === -1) return
        this.dislikeBtnClick.emit()
    }
    
    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}