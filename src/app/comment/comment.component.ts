import { Component, Input } from '@angular/core';

interface Vote {
  user: string
}

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
  likes: Vote[],
  dislikes: Vote[],
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
