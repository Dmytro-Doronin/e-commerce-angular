import { inject, Injectable, signal } from '@angular/core'
import { CategoriesApiService } from './categories-api.service'
import { Subscription } from 'rxjs'
import { Category } from './categories.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService {
  categoriesApiService = inject(CategoriesApiService)
  loadPopularCategoriesSubscription: Subscription | null = null
  popularCategories$ = signal<Category[] | null>(null)
  isLoadingPopularCategories$ = signal<boolean>(false)

  loadPopularCategories() {
    if (this.loadPopularCategoriesSubscription) {
      this.loadPopularCategoriesSubscription.unsubscribe()
    }

    this.isLoadingPopularCategories$.set(true)

    this.loadPopularCategoriesSubscription = this.categoriesApiService.getCategories().subscribe({
      next: categories => {
        this.popularCategories$.set(categories.slice(0, 5))
        this.loadPopularCategoriesSubscription = null
      },
      error: () => {
        this.isLoadingPopularCategories$.set(false)
      },
      complete: () => {
        this.loadPopularCategoriesSubscription = null
        this.isLoadingPopularCategories$.set(false)
      },
    })
  }
}
