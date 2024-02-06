import { Injectable } from '@angular/core';
import { IProductCart } from 'src/app/product/models/product.model';
import { of, tap, Observable, Subject, shareReplay, map, merge, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CartService {
    addToCartClick$ = new Subject<IProductCart>()
    removeFromCartClick$ = new Subject<string>()
    updateCartClick$ = new Subject<IProductCart>()
    isOrderConfirmed$ = new Subject<boolean>()

    products$: Observable<IProductCart[]> = merge(
        of(null),
        this.addToCartClick$.pipe(
            tap(product => this.addProd(product))
        ),
        this.removeFromCartClick$.pipe(
            tap(prodId => this.removeProd(prodId))
        ),
        this.updateCartClick$.pipe(
            tap(product => {
                const data = this.getStorageValue();
                data && this.updateProd(data, product._id, product.amount);
            })
        ),
        this.isOrderConfirmed$
      ).pipe(
        switchMap(() => {
            const data = this.getStorageValue();
            return of(data ? JSON.parse(data) : null);
        }),
        shareReplay(1)
      );

    totalPrice$ = this.products$.pipe(
        map((products) => {
            if (!products) return 0;
            return products.reduce((accumulator: number, product: any) => {
              const price = product.searchStatus.find((item: any) => item.searchPosition === 'price')?.option?.new || 0;
              return accumulator + product.amount * price;
            }, 0);
          })
    )

    totalProductsNumber$ = this.products$.pipe(
        map(() => {
            const data = this.getStorageValue();
            const products = data ? JSON.parse(data) : null
            if (!products) return 0;
            return products.reduce((accumulator: number, product: any) => accumulator + product.amount, 0);
        }),
    )

    addToShoppingCart(product: IProductCart): void {
        this.addToCartClick$.next(product)
    }

    updateShoppingCart(product: IProductCart) {
        this.updateCartClick$.next(product)
    }

    addProd(product: IProductCart) {
        if (typeof window === 'undefined' && !localStorage) return
        const data = this.getStorageValue()
        // якщо корзини немає - створюємо, якщо є - додаємо продукт в існуючу
        if (!data) {
            this.setStorageValue([product])
        } else {
            const cartData = JSON.parse(data ? data : '');
            const productIndex = cartData.findIndex((prod: IProductCart) => prod._id === product._id);
            if (productIndex > -1) {
                return
            }
            cartData.unshift(product);
            this.setStorageValue(cartData)
        }
    }

    updateProd(data: string, id: string, amount: number) {
        if (typeof window === 'undefined' && !localStorage) return
        const parsedCartData = JSON.parse(data)
        const productIndex = parsedCartData.findIndex((prod: IProductCart) => prod._id === id);
        parsedCartData[productIndex].amount = amount;
        this.setStorageValue(parsedCartData)
    }
    
    removeProd(prodId: string) {
        if (typeof window === 'undefined' && !localStorage) return
        const data = this.getStorageValue();
        const parsedCartData = data && JSON.parse(data);
        const newData = parsedCartData.filter((prod: any) => prod._id !== prodId)
        this.setStorageValue(newData)
    }
 
    removeFromCart(id: string) {
        this.removeFromCartClick$.next(id)
    }

    setOrderConfirmed(): void {
        if (typeof window !== 'undefined' && localStorage) {
            this.setStorageValue([])
        }
        this.isOrderConfirmed$.next(true)
    }

    setStorageValue(value: any) {
        if (typeof window === 'undefined' && !localStorage) return
        localStorage.setItem('shoppingCart', JSON.stringify(value));
    }

    getStorageValue() {
        if (typeof window === 'undefined' && !localStorage) return
        return localStorage.getItem('shoppingCart');
    }

}

