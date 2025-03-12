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

  getProducts(
    categoryId?: Category['id'] | null,
    title?: string | null,
    price_min?: string | null,
    price_max?: string | null,
    offset?: string | null,
    limit?: string | null
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, {
      params: getParamsFromObject({
        categoryId: categoryId,
        title: title,
        price_min: price_min,
        price_max: price_max,
        offset: offset,
        limit: limit,
      }),
    })
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`)
  }
}
