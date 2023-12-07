import { NgModule } from '@angular/core';
import { CommentComponent } from './comment.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from '../rating/rating.module';

@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RatingModule
  ],
  exports: [
    CommentComponent
  ]
})
export class CommentModule { }
