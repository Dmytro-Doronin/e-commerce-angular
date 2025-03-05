import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CarouselComponent } from '../../components/carousel/carousel.component'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { SectionComponent } from '../../components/section/section.component'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { CategoriesStoreService } from '../../shared/services/categories/categories-store.service'
import { SuggestionCategoriesComponent } from '../../components/suggestion-categories/suggestion-categories.component'
import { FiltersForSliderPipe } from '../../shared/pipes/images-for-slider/filters-for-slider.pipe'

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    CarouselComponent,
    CardListComponent,
    SectionComponent,
    ButtonComponent,
    SuggestionCategoriesComponent,
    FiltersForSliderPipe,
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {
  productsStoreService = inject(ProductsStoreService)
  categoriesStoreService = inject(CategoriesStoreService)

  readonly suggestedProducts = this.productsStoreService.suggestionProducts
  readonly popularCategories = this.categoriesStoreService.popularCategories$
  readonly popularCategoriesLoading = this.categoriesStoreService.isLoadingPopularCategories$

  constructor() {
    this.productsStoreService.loadSuggestionProducts()
    this.categoriesStoreService.loadPopularCategories()
  }
}
