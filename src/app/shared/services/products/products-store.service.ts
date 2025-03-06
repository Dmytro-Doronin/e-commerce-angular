import { inject, Injectable, signal } from '@angular/core'
import { ProductsApiService } from './products-api.service'
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs'
import { Product } from './products.interface'
import { Category } from '../categories/categories.interface'
import { FormControl } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private readonly productsApiService = inject(ProductsApiService)
  private loadSuggestionProductsSubscription: Subscription | null = null
  private loadProductsSubscription: Subscription | null = null
  private searchProductsSubscription: Subscription | null = null
  products = signal<Product[] | null>(null)
  searchedProducts = signal<Product[] | null>(null)
  suggestionProducts = signal<Product[] | null>(null)

  setupSearch(formControl: FormControl) {
    formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => this.productsApiService.getProducts(null, query))
      )
      .subscribe({
        next: products => {
          this.searchedProducts.set(products)
        },
        error: error => {
          console.error(error)
        },
      })
  }

  loadProducts(id: Category['id'] | null = null): void {
    if (this.loadProductsSubscription) {
      this.loadProductsSubscription.unsubscribe()
    }

    this.loadProductsSubscription = this.productsApiService.getProducts(id).subscribe({
      next: products => {
        this.products.set(products)
        this.loadProductsSubscription = null
      },
      error: error => {
        console.log(error)
      },
    })
  }

  loadSuggestionProducts() {
    if (this.loadSuggestionProductsSubscription) {
      this.loadSuggestionProductsSubscription.unsubscribe()
    }
    this.loadSuggestionProductsSubscription = this.productsApiService.getProducts().subscribe({
      next: products => {
        this.suggestionProducts.set(products.slice(0, 6))
        this.loadSuggestionProductsSubscription = null
      },
      error: error => {
        console.log(error)
      },
    })
  }

  deleteSearchedProducts() {
    this.searchedProducts.set(null)
  }
}
