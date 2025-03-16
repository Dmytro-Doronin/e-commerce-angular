import { inject, Injectable, signal } from '@angular/core'
import { ProductsApiService } from './products-api.service'
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs'
import { LoadProductsInterface, Product } from './products.interface'
import { FormControl } from '@angular/forms'
import { AlertService } from '../alert/alert.service'
import { ErrorType } from '../errors.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private readonly productsApiService = inject(ProductsApiService)
  alertService = inject(AlertService)
  private loadSuggestionProductsSubscription: Subscription | null = null
  private loadProductSubscription: Subscription | null = null
  private loadProductsSubscription: Subscription | null = null
  private loadProductsCountSubscription: Subscription | null = null
  private searchProductsSubscription: Subscription | null = null
  product = signal<Product | null>(null)
  productLoading = signal<boolean>(false)
  products = signal<Product[] | null>(null)
  productsLoading = signal<boolean>(false)
  productsCount = signal<number>(0)
  searchedProducts = signal<Product[] | null>(null)
  suggestionProducts = signal<Product[] | null>(null)
  suggestionProductsLoading = signal<boolean>(false)

  loadProduct(id: string): void {
    if (this.loadProductSubscription) {
      this.loadProductSubscription.unsubscribe()
    }
    this.product.set(null)
    this.productLoading.set(true)
    this.loadProductSubscription = this.productsApiService.getProduct(id).subscribe({
      next: product => {
        this.product.set(product)
        this.productLoading.set(false)
        this.loadProductSubscription = null
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
      },
      complete: () => {
        this.productLoading.set(false)
      },
    })
  }

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
        error: (error: ErrorType) => {
          this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        },
      })
  }
  loadProducts({
    id,
    title,
    price_min,
    price_max,
    offset,
    limit,
  }: LoadProductsInterface = {}): void {
    if (this.loadProductsSubscription) {
      this.loadProductsSubscription.unsubscribe()
    }
    this.productsLoading.set(true)
    this.loadProductsSubscription = this.productsApiService
      .getProducts(id, title, price_min, price_max, offset, limit)
      .subscribe({
        next: products => {
          this.products.set(products)
          this.productsLoading.set(false)
          this.loadProductsSubscription = null
        },
        error: (error: ErrorType) => {
          this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        },
        complete: () => {
          this.productsLoading.set(false)
        },
      })
  }

  loadProductsCount({ id, title, price_min, price_max }: LoadProductsInterface = {}): void {
    if (this.loadProductsCountSubscription) {
      this.loadProductsCountSubscription.unsubscribe()
    }
    this.loadProductsCountSubscription = this.productsApiService
      .getProducts(id, title, price_min, price_max)
      .subscribe({
        next: products => {
          this.productsCount.set(products.length)
          this.loadProductsCountSubscription = null
        },
        error: (error: ErrorType) => {
          this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        },
      })
  }

  loadSuggestionProducts() {
    if (this.loadSuggestionProductsSubscription) {
      this.loadSuggestionProductsSubscription.unsubscribe()
    }

    this.suggestionProductsLoading.set(true)

    this.loadSuggestionProductsSubscription = this.productsApiService.getProducts().subscribe({
      next: products => {
        this.suggestionProducts.set(products.slice(0, 8))
        this.loadSuggestionProductsSubscription = null
        this.suggestionProductsLoading.set(false)
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
      },
      complete: () => {
        this.suggestionProductsLoading.set(false)
      },
    })
  }

  deleteSearchedProducts() {
    this.searchedProducts.set(null)
  }
}
