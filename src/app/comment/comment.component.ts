import { Component, Input } from '@angular/core';

export interface Comment {
  author?: string,
  user?: any,
  date?: Date,
  text?: string,
  content?: string,
  rating?: number, 
  raiting?: number,
  advantages?: string,
  disadvantages?: string,
  likes: number,
  dislikes: number,
  photo?: string,
  photos?: string[],
  video?: string,
  createdAt: Date
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent {
    @Input() comment!: Comment
}
