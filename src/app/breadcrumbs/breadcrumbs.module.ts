import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        BreadcrumbsComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        BreadcrumbsComponent
    ]
})
export class BreadcrumbsModule { }
