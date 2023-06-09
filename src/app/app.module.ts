import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { SearchModule } from './search/search.module';
import { CoreModule } from './core/core.module';
import { ModalModule } from './shared/components/modal/modal.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductModule,
    SearchModule,
    CoreModule,
    ModalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
