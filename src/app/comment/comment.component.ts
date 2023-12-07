import { Component, Input } from '@angular/core';

export interface Comment {
  author: string,
  date: any,
  text: string,
  rating?: number, 
  advantages?: string,
  disadvantages?: string,
  likes: number,
  dislikes: number,
  photo?: string,
  video?: string,
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent {
  @Input() comment!: Comment
}
