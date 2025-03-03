import { inject, Injectable, signal } from '@angular/core'
import { ProductsApiService } from './products-api.service'
import { Subscription } from 'rxjs'
import { Product } from './products.interface'
import { Category } from '../categories/categories.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private readonly productsApiService = inject(ProductsApiService)
  private loadSuggestionProductsSubscription: Subscription | null = null
  private loadProductsSubscription: Subscription | null = null
  products$ = signal<Product[] | null>(null)
  suggestionProducts$ = signal<Product[] | null>(null)
  suggestionProductsLoading$ = signal<boolean>(false)

  loadProducts(id: Category['id'] | null = null): void {
    if (this.loadProductsSubscription) {
      this.loadProductsSubscription.unsubscribe()
    }

    this.loadProductsSubscription = this.productsApiService.getProducts(id).subscribe(products => {
      this.products$.set(products)

      this.loadProductsSubscription = null
    })
  }

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
