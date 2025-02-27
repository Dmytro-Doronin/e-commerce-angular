import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CarouselComponent } from '../../components/carousel/carousel.component'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { SectionComponent } from '../../components/section/section.component'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { CategoriesStoreService } from '../../shared/services/categories/categories-store.service'
import { SuggestionCategoriesComponent } from '../../components/suggestion-categories/suggestion-categories.component'

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    CarouselComponent,
    CardListComponent,
    SectionComponent,
    ButtonComponent,
    SuggestionCategoriesComponent,
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  productsStoreService = inject(ProductsStoreService)
  categoriesStoreService = inject(CategoriesStoreService)

  readonly suggestedProducts = this.productsStoreService.suggestionProducts$
  readonly suggestedProductsLoading = this.productsStoreService.suggestionProductsLoading$
  readonly popularCategories = this.categoriesStoreService.popularCategories$
  readonly popularCategoriesLoading = this.categoriesStoreService.isLoadingPopularCategories$

  slides = [
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
  ]

  ngOnInit() {
    this.productsStoreService.loadSuggestionProducts()
    this.categoriesStoreService.loadPopularCategories()
  }
}
