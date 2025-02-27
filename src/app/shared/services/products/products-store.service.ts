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
  suggestionProductsLoading$ = signal<boolean>(false)

  loadSuggestionProducts() {
    if (this.loadSuggestionProductsSubscription) {
      this.loadSuggestionProductsSubscription.unsubscribe()
    }
    this.suggestionProductsLoading$.set(true)
    this.loadSuggestionProductsSubscription = this.productsApiService.getProducts().subscribe({
      next: products => {
        this.suggestionProducts$.set(products.slice(0, 6))
        this.loadSuggestionProductsSubscription = null
        this.suggestionProductsLoading$.set(false)
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        this.suggestionProductsLoading$.set(false)
      },
    })
  }
}
