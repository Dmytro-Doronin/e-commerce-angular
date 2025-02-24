import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { CarouselComponent } from '../../components/carousel/carousel.component'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { SectionComponent } from '../../components/section/section.component'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { CategoriesStoreService } from '../../shared/services/categories/categories-store.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { NgClass, NgForOf, NgStyle } from '@angular/common'
import { Category } from '../../shared/services/categories/categories.interface'

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    CarouselComponent,
    CardListComponent,
    SectionComponent,
    ButtonComponent,
    LoaderComponent,
    NgClass,
    NgForOf,
    NgStyle,
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  productsStoreService = inject(ProductsStoreService)
  categoriesStoreService = inject(CategoriesStoreService)

  readonly suggestedProducts = this.productsStoreService.suggestionProducts$
  // readonly popularCategories = this.categoriesStoreService.popularCategories$
  readonly popularCategories = signal<Category[] | null>(null)
  readonly categoryGridAreas = ['area-a', 'area-b', 'area-c', 'area-d', 'area-e', 'area-f']

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
