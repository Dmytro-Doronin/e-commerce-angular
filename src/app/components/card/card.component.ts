import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core'
import { CarouselComponent } from '../carousel/carousel.component'
import { Product } from '../../shared/services/products/products.interface'
import { ButtonComponent } from '../ui/button/button.component'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'
import { CartService } from '../../shared/services/cart/cart.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CarouselComponent, ButtonComponent, ConvertPipe, RouterLink],
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

  inCart() {
    return this.cartService.isInCart(this.card()!)
  }

  onAddToCard() {
    if (this.inCart()) {
      this.cartService.removeFromCart(this.card()!.id)
    } else {
      this.cartService.addToCart(this.card()!)
    }
  }
}
