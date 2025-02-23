import { inject, Injectable, signal } from '@angular/core'
import { ProductsApiService } from './products-api.service.ts.service'
import { Subscription } from 'rxjs'
import { Product } from './products.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private readonly productsApiService = inject(ProductsApiService)
  private loadProductsSubscription: Subscription | null = null
  suggestionProducts$ = signal<Product[] | null>(null)

  loadProducts() {
    if (this.loadProductsSubscription) {
      this.loadProductsSubscription.unsubscribe()
    }

    this.loadProductsSubscription = this.productsApiService.getProducts().subscribe(products => {
      this.suggestionProducts$.set(products.slice(0, 6))
      this.loadProductsSubscription = null
    })
  }
}
