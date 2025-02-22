import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Product } from '../../shared/product.interface'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  card = input<Product>()
}
