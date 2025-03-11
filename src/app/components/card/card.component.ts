import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { CartItem } from '../../shared/services/cart/cats.interface'

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
  isCartVariant = input<boolean>(false)
  inCard = signal<boolean>(false)

  constructor() {
    effect(
      () => {
        const savedCart = localStorage.getItem('cart')

        if (savedCart) {
          const products: CartItem[] = JSON.parse(savedCart)
          const productExist = products.find(item => item.product.id === this.card()!.id)
          if (productExist) {
            this.inCard.set(!!productExist)
          }
        }
      },
      { allowSignalWrites: true }
    )
  }

  onAddToCard() {
    if (this.inCard()) {
      this.cartService.removeFromCart(this.card()!.id)
      this.inCard.set(!this.inCard())
    } else {
      this.cartService.addToCart(this.card()!)
      this.inCard.set(!this.inCard())
    }
  }
}
