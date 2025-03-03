import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core'
import { NavigationComponent } from '../../components/navigation/navigation.component'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { CategoriesStoreService } from '../../shared/services/categories/categories-store.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NavigationComponent, CardListComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  private readonly route = inject(ActivatedRoute)

  private readonly categoriesStoreService = inject(CategoriesStoreService)
  private readonly productsStoreService = inject(ProductsStoreService)

  id = toSignal(this.route.queryParams.pipe(map(params => params['categoryId'] || null)))

  categories = this.categoriesStoreService.allCategories$
  products = this.productsStoreService.products$

  constructor() {
    this.listenQueryParams()
  }

  listenQueryParams() {
    effect(() => {
      const currentId = this.id()
      console.log('currentId ', currentId)
      this.productsStoreService.loadProducts(currentId)
    })
  }
}
