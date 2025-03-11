import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import { CartService } from '../../shared/services/cart/cart.service'
import { ButtonComponent } from '../../components/ui/button/button.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartServes = inject(CartService)
  cartItems = this.cartServes.cartItems
}
