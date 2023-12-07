import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputSearchBoxComponent } from './input-searchBox/input-searchBox.component';
import { InputTextComponent } from './input-text/input-text.component';
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
    SelectComponent
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
    SelectComponent,
    FormsModule
  ]
})
export class InputsModule { }
