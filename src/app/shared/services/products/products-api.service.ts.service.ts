import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from './products.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly httpClient = inject(HttpClient)
  baseUrl = 'https://api.escuelajs.co/api/v1'

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`)
  }
}
