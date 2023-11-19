import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { MainCategoryComponent } from './search/pages/main-category/main-category.component';
import { MiddleCategoryComponent } from './search/pages/middle-category/middle-category.component';
import { ErrorComponent } from './core/pages/error/error.component';
import { ProductComponent } from './product/pages/product/product.component';
import { ProductCharacteristicsComponent } from './product/pages/product-characteristics/product-characteristics.component';
import { ProductAllComponent } from './product/pages/product-all/product-all.component';
import { ProductCommentsComponent } from './product/pages/product-comments/product-comments.component';
import { ProductVideoComponent } from './product/pages/product-video/product-video.component';
import { ProductPhotosComponent } from './product/pages/product-photos/product-photos.component';
import { Router } from '@angular/router';
import { ApiService } from './core/services/api.service';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'checkout',
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./cabinet/cabinet.module').then((m) => m.CabinetModule)
    },
    {path: 'error', component: ErrorComponent},
    {path: '**', redirectTo: '/error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

    constructor(private router: Router, private apiService: ApiService) {}

    loadDynamicRoutes(): void {
        let categoriesRoutes: any = []
        let middleCategoriesRoutes: any = []
        let productsRoutes: any = []

        if (localStorage.getItem('categoriesRoutes') && localStorage.getItem('middleCategoriesRoutes')) {
            const st: any = localStorage.getItem('categoriesRoutes')
            const data = JSON.parse(st)
            categoriesRoutes = data
            this.addRoute(categoriesRoutes, MainCategoryComponent)

            const middleCatData: any = localStorage.getItem('middleCategoriesRoutes')
            const parsedMiddleCatData = JSON.parse(middleCatData)
            middleCategoriesRoutes = parsedMiddleCatData
            this.addRoute(middleCategoriesRoutes, MiddleCategoryComponent)
        } else {
            this.apiService.getAllCategories().subscribe({
                next: response => {
                    response.map((category: any) => {
                        categoriesRoutes.push({title: category.engName, id: category.id})
                        category.subCategories.map((middleCat: any) => {
                            middleCategoriesRoutes.push({title: middleCat.engName, id: middleCat.id})
                        })
                    })
                    if (!localStorage.getItem('categoriesRoutes')) {
                        localStorage.setItem('categoriesRoutes', JSON.stringify(categoriesRoutes));
                    }
                    if (!localStorage.getItem('middleCategoriesRoutes')) {
                        localStorage.setItem('middleCategoriesRoutes', JSON.stringify(middleCategoriesRoutes));
                    }
                    this.addRoute(categoriesRoutes, MainCategoryComponent)
                    this.addRoute(middleCategoriesRoutes, MiddleCategoryComponent)
                },
                error: err => console.log(err)
            })
        } 
        

        if (localStorage.getItem('productsRoutes')) {
            const st: any = localStorage.getItem('productsRoutes')
            const data = JSON.parse(st)
            productsRoutes = data
            this.addProductRoute(productsRoutes)
        } else {
            this.apiService.getAllProducts().subscribe({
                next: response => {
                    response.map((product: any) => {
                        productsRoutes.push({title: product.engName, id: product._id})
                    })
                    if (!localStorage.getItem('productsRoutes')) {
                        localStorage.setItem('productsRoutes', JSON.stringify(productsRoutes));
                    } 
                    this.addProductRoute(productsRoutes)
                },
                error: err => console.log(err)
            })
        }
    }

    addRoute(data: any, component: any) {
        const route: Route = {
            matcher: (url) => {
                for (let i = 0; i < data.length; i++) {
                if (url[0] && url[1]) {
                    if (url[0].path == data[i].title && url[1].path == data[i].id) {
                    return {
                        consumed: url
                    }
                    }
                }
                }
                return null
            }, component: component
        }

        this.router.config.unshift(route);
    }

    addProductRoute(productsRoutes: any) {
        const route: Route = {
            matcher: (url: any) => { 
                for (let i = 0; i < productsRoutes.length; i++) {
                    if (url[0] && url[1]) {
                        if (url.length === 2 && url[0].path == productsRoutes[i].title && url[1].path == productsRoutes[i].id) {
                            return {consumed: url}
                        } else if (url.length === 3) {
                            return {consumed: url.slice(0, 2)}
                        }
                    }
                }
                return null
            }, component: ProductComponent, children: [
        {
          path: '',
          component: ProductAllComponent,
        },
        {
          path: 'characteristics',
          component: ProductCharacteristicsComponent,
        },
        {
          path: 'comments',
          component: ProductCommentsComponent,
        },
        {
          path: 'video',
          component: ProductVideoComponent,
        },
        {
          path: 'photos',
          component: ProductPhotosComponent,
        },
        ],
        }
        this.router.config.unshift(route);
    }

}
