import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from './categories.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  httpClient = inject(HttpClient)
  baseUrl = 'https://api.escuelajs.co/api/v1'

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/categories`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/categories/${id}`)
  }
}
