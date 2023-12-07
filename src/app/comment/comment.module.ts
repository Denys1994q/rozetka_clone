import { NgModule } from '@angular/core';
import { CommentComponent } from './comment.component';
import { CommentsPanelComponent } from './comments-panel/comments-panel.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from '../rating/rating.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  declarations: [
    CommentComponent,
    CommentsPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    RatingModule,
    SharedModule,
    InputsModule
  ],
  exports: [
    CommentComponent,
    CommentsPanelComponent
  ]
})
export class CommentModule { }
