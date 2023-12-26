import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from 'src/app/product/models/product.model';

interface IOrderItem {
    orderDate: Date,
    orderNumber: number,
    product: IProduct,
    _id: string
}

@Injectable({ providedIn: 'root' })

export class OrdersService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    private orderslistItemsSubject = new BehaviorSubject<any[]>([]);
    orderslistItems$: Observable<any[]> = this.orderslistItemsSubject.asObservable();

    setOrdersListItems(data: any) {
        this.orderslistItemsSubject.next(data)
        this.sortOrdersListByDateDesc()
    }

    addToOrdersList(productId: string):Observable<{message: string} | void> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/add-to-orderslist/${productId}` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string}>(apiUrl, null, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    sortOrdersListByDateDesc() {
        this.orderslistItemsSubject.next([...this.orderslistItemsSubject.value.sort((a, b) => {
            // Сортування за спаданням за датою
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        })]);
    }

    getOrdersProdsList() {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/orderslist`;
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            return this.http.get<{products: IOrderItem[]}>(apiUrl, { headers, withCredentials: true })
        } else {
            return throwError('Local storage is not available.');
        }
    }

}