import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from './products.interface'
import { Category } from '../categories/categories.interface'
import { getParamsFromObject } from '../get-params-from-object'

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly httpClient = inject(HttpClient)
  baseUrl = 'https://api.escuelajs.co/api/v1'

  getProducts(categoryId?: Category['id'] | null): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, {
      params: getParamsFromObject({ categoryId: categoryId }),
    })
  }
}
