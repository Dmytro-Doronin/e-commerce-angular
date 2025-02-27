import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CardComponent } from '../card/card.component'
import { Product } from '../../shared/services/products/products.interface'
import { LoaderComponent } from '../loader/loader.component'

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, LoaderComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  products = input<Product[] | null>(null)
  loading = input<boolean>(false)
}
