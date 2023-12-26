import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/categories/models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<ICategory[]> {
        const apiUrl = `${this.backendUrl}/categories` 
        return this.http.get<ICategory[]>(apiUrl);
    }

    getOneCategory(id: string): Observable<ICategory> {
        const apiUrl = `${this.backendUrl}/categories/${id}` 
        return this.http.get<ICategory>(apiUrl);
    }

}