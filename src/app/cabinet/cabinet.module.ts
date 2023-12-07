import { NgModule } from '@angular/core';
import { CabinetPage } from './pages/cabinet/cabinet.component';
import { SharedModule } from '../shared/shared.module';
import { CabinetOrdersPage } from './pages/cabinet-orders/cabinet-orders.component';
import { CabinetPersonalInfoPage } from './pages/cabinet-personalInfo/cabinet-personalInfo.component';
import { CabinetRecentlyViewedPage } from './pages/cabinet-recently-viewed/cabinet-recently-viewed.component';
import { CabinetWishlistPage } from './pages/cabinet-wishlist/cabinet-wishlist.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth.guard';
import { ProductModule } from '../product/product.module';
import { InputsModule } from '../inputs/inputs.module';
import { BtnsModule } from '../btns/btns.module';
import { AsideModule } from '../aside/aside.module';

const routes = [
  {path: '', component: CabinetPage, canActivate: [AuthGuard], children: [
    {
      path: 'personal-information',
      canActivate: [AuthGuard],
      component: CabinetPersonalInfoPage,
    },
    {
        path: 'orders',
        canActivate: [AuthGuard],
        component: CabinetOrdersPage,
    },
    {
        path: 'wishlist',
        canActivate: [AuthGuard],
        component: CabinetWishlistPage,
    },
    {
        path: 'recently-viewed',
        canActivate: [AuthGuard],
        component: CabinetRecentlyViewedPage,
    },
]},
];

@NgModule({
  declarations: [
    CabinetPage,
    CabinetOrdersPage,
    CabinetPersonalInfoPage,
    CabinetRecentlyViewedPage,
    CabinetWishlistPage,
  ],
  imports: [
    RouterModule.forChild(routes),
    InputsModule,
    SharedModule,
    ProductModule,
    BtnsModule,
    AsideModule
  ],
  exports: [],
})
export class CabinetModule { }
