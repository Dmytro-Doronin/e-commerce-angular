import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core'
import { NavigationComponent } from '../../components/navigation/navigation.component'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { CategoriesStoreService } from '../../shared/services/categories/categories-store.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { InputComponent } from '../../components/ui/input/input.component'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NavigationComponent,
    CardListComponent,
    ButtonComponent,
    InputComponent,
    LoaderComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  private readonly route = inject(ActivatedRoute)

  private readonly categoriesStoreService = inject(CategoriesStoreService)
  private readonly productsStoreService = inject(ProductsStoreService)

  id = toSignal(this.route.queryParams.pipe(map(params => params['categoryId'] || null)))

  categories = this.categoriesStoreService.allCategories
  products = this.productsStoreService.products
  currentCategory = this.categoriesStoreService.category

  currentCategoryName = computed(() => (this.id() === 'All' ? 'All' : this.currentCategory()?.name))

  filtersActive = signal<boolean>(false)

  constructor() {
    this.listenQueryParams()
  }

  listenQueryParams() {
    effect(() => {
      const currentId = this.id()
      if (currentId !== 'All') {
        this.productsStoreService.loadProducts(currentId)
        this.categoriesStoreService.loadCategoryById(currentId)
      } else {
        this.productsStoreService.loadProducts()
      }
    })
  }

  setFiltersActive() {
    this.filtersActive.set(!this.filtersActive())
  }
}
