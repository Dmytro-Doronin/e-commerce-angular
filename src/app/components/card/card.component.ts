import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core'
import { CarouselComponent } from '../carousel/carousel.component'
import { Product } from '../../shared/services/products/products.interface'
import { ButtonComponent } from '../ui/button/button.component'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'
import { CartService } from '../../shared/services/cart/cart.service'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CarouselComponent, ButtonComponent, ConvertPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  private readonly cartService = inject(CartService)
  card = input<Product>()
  variant = input<'horizontal' | 'vertical'>('vertical')
  inCard = signal<boolean>(false)

  onAddToCard() {
    if (this.inCard()) {
      this.cartService.removeFromCart(this.card()!.id)
      this.inCard.set(!this.inCard())
    } else {
      this.cartService.addToCart(this.card()!.id)
      this.inCard.set(!this.inCard())
    }
  }
}
