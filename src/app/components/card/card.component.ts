import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { CarouselComponent } from '../carousel/carousel.component'
import { Product } from '../../shared/services/products/products.interface'
import { ButtonComponent } from '../ui/button/button.component'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CarouselComponent, ButtonComponent, ConvertPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  card = input<Product>()

  inCard = signal<boolean>(false)

  onAddToCard() {
    this.inCard.set(!this.inCard())
  }
}
