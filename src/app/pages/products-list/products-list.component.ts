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
import { FormControl, FormGroup } from '@angular/forms'
import { LoadProductsInterface } from '../../shared/services/products/products.interface'
import { PaginationComponent } from '../../components/pagination/pagination.component'

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NavigationComponent,
    CardListComponent,
    ButtonComponent,
    InputComponent,
    LoaderComponent,
    PaginationComponent,
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
  productsLoading = this.productsStoreService.productsLoading
  currentCategory = this.categoriesStoreService.category
  currentCategoryName = computed(() => (this.id() === 'All' ? 'All' : this.currentCategory()?.name))
  filtersActive = signal<boolean>(false)

  filterForm = new FormGroup({
    from: new FormControl('1'),
    to: new FormControl('1000000'),
  })

  fromSignal = toSignal(this.filterForm.controls.from.valueChanges, {
    initialValue: this.filterForm.controls.from.value,
  })
  toSignal = toSignal(this.filterForm.controls.to.valueChanges, {
    initialValue: this.filterForm.controls.to.value,
  })

  constructor() {
    this.listenToQueryParams()
    this.listenToCategoryChanges()
  }

  listenToQueryParams() {
    effect(
      () => {
        const currentId = this.id()
        const price_min = this.fromSignal()
        const price_max = this.toSignal()

        const params: LoadProductsInterface = { price_min, price_max }

        if (currentId !== 'All') {
          params['id'] = currentId
        }

        this.productsStoreService.loadProducts(params)
      },
      { allowSignalWrites: true }
    )
  }

  listenToCategoryChanges() {
    effect(
      () => {
        const currentId = this.id()

        if (currentId !== 'All') {
          this.categoriesStoreService.loadCategoryById(currentId)
        }
      },
      { allowSignalWrites: true }
    )
  }

  // listenQueryParams() {
  //   effect(() => {
  //     const currentId = this.id()
  //     const price_min = this.fromSignal()
  //     const price_max = this.toSignal()
  //     if (currentId !== 'All') {
  //       this.productsStoreService.loadProducts({
  //           id: currentId,
  //           price_max: price_max,
  //           price_min: price_min
  //       })
  //       this.categoriesStoreService.loadCategoryById(currentId)
  //     } else {
  //       this.productsStoreService.loadProducts({
  //         price_max: price_max,
  //         price_min: price_min
  //       })
  //     }
  //   }, {allowSignalWrites: true})
  // }

  setFiltersActive() {
    this.filtersActive.set(!this.filtersActive())
  }
}
