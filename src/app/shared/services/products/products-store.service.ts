import { inject, Injectable, signal } from '@angular/core'
import { ProductsApiService } from './products-api.service'
import { Subscription } from 'rxjs'
import { Product } from './products.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private readonly productsApiService = inject(ProductsApiService)
  private loadSuggestionProductsSubscription: Subscription | null = null
  suggestionProducts$ = signal<Product[] | null>(null)

  loadSuggestionProducts() {
    if (this.loadSuggestionProductsSubscription) {
      this.loadSuggestionProductsSubscription.unsubscribe()
    }

    this.loadSuggestionProductsSubscription = this.productsApiService
      .getProducts()
      .subscribe(products => {
        this.suggestionProducts$.set(products.slice(0, 6))
        this.loadSuggestionProductsSubscription = null
      })
  }
}
