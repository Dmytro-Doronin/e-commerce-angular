import { inject, Injectable, signal } from '@angular/core'
import { CategoriesApiService } from './categories-api.service'
import { Subscription } from 'rxjs'
import { Category } from './categories.interface'
import { AlertService } from '../alert/alert.service'
import { ErrorType } from '../errors.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService {
  categoriesApiService = inject(CategoriesApiService)
  alertService = inject(AlertService)

  loadAllCategoriesSubscription: Subscription | null = null
  loadPopularCategoriesSubscription: Subscription | null = null
  loadCategoryByIdSubscription: Subscription | null = null
  category = signal<Category | null>(null)
  allCategories = signal<Category[] | null>(null)
  popularCategories = signal<Category[] | null>(null)
  isLoadingAllCategories = signal<boolean>(false)
  isLoadingPopularCategories = signal<boolean>(false)

  loadCategoryById(id: string) {
    if (this.loadCategoryByIdSubscription) {
      this.loadCategoryByIdSubscription.unsubscribe()
    }

    this.loadCategoryByIdSubscription = this.categoriesApiService.getCategoryById(id).subscribe({
      next: category => {
        this.category.set(category)
        this.loadCategoryByIdSubscription = null
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
      },
      complete: () => {
        this.loadCategoryByIdSubscription = null
      },
    })
  }

  loadAllCategories() {
    if (this.loadAllCategoriesSubscription) {
      this.loadAllCategoriesSubscription.unsubscribe()
    }

    this.isLoadingAllCategories.set(true)

    this.loadAllCategoriesSubscription = this.categoriesApiService.getCategories().subscribe({
      next: categories => {
        this.allCategories.set([
          {
            id: 'All',
            name: 'All',
            image:
              'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
          },
          ...categories,
        ])
        this.loadPopularCategoriesSubscription = null
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.isLoadingAllCategories.set(false)
      },
      complete: () => {
        this.loadPopularCategoriesSubscription = null
        this.isLoadingAllCategories.set(false)
      },
    })
  }

  loadPopularCategories() {
    if (this.loadPopularCategoriesSubscription) {
      this.loadPopularCategoriesSubscription.unsubscribe()
    }

    this.isLoadingPopularCategories.set(true)

    this.loadPopularCategoriesSubscription = this.categoriesApiService.getCategories().subscribe({
      next: categories => {
        this.popularCategories.set(categories.slice(0, 5))
        this.loadPopularCategoriesSubscription = null
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.isLoadingPopularCategories.set(false)
      },
      complete: () => {
        this.loadPopularCategoriesSubscription = null
        this.isLoadingPopularCategories.set(false)
      },
    })
  }
}
