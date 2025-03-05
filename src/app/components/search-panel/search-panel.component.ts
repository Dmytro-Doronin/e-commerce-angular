import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { InputComponent } from '../ui/input/input.component'
import { FormControl } from '@angular/forms'
import { CardListComponent } from '../card-list/card-list.component'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { CardComponent } from '../card/card.component'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [InputComponent, CardListComponent, CardComponent],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPanelComponent {
  productsService = inject(ProductsStoreService)
  searchedProducts = this.productsService.searchedProducts
  search = new FormControl<string>('')
  searchSignal = toSignal(this.search.valueChanges)
  showDropdown = computed(() => (this.searchSignal() ?? '').trim().length > 0)

  constructor() {
    this.productsService.setupSearch(this.search)
  }
}
