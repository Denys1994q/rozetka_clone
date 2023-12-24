import { Routes } from '@angular/router';
import { MainCategoryModule } from 'src/app/categories/pages/main-category/main-category.module';

const mainCategoryRoutes: Routes = [
  { path: 'household-appliances/c80254', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
  { path: 'telefony-tv-i-ehlektronika/c4627949', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
  { path: 'computers-notebooks/c80253', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
  { path: 'game-zone/c80255', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
  { path: 'sport-i-uvlecheniya/c4627893', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
  { path: 'tovary-dlya-doma/c2394287', loadChildren: () => import('./categories/pages/main-category/main-category.module').then((m) => m.MainCategoryModule) },
];

export { mainCategoryRoutes };
