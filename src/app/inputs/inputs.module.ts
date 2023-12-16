import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputSearchBoxComponent } from './input-searchBox/input-searchBox.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { SelectComponent } from './select/select.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CheckboxComponent,
    InputSearchBoxComponent,
    InputTextComponent,
    SelectComponent,
    InputTextareaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  exports: [
    CheckboxComponent,
    InputSearchBoxComponent,
    InputTextComponent,
    InputTextareaComponent,
    SelectComponent,
    FormsModule
  ]
})
export class InputsModule { }
