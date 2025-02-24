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

  loadPopularCategories() {
    if (this.loadPopularCategoriesSubscription) {
      this.loadPopularCategoriesSubscription.unsubscribe()
    }

    this.loadPopularCategoriesSubscription = this.categoriesApiService
      .getCategories()
      .subscribe(categories => {
        console.log(categories)
        this.popularCategories$.set(categories.slice(0, 5))
        this.loadPopularCategoriesSubscription = null
      })
  }
}
