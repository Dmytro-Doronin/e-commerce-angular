import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import { CartService } from '../../shared/services/cart/cart.service'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'
import { RemoveIconComponent } from '../../components/icons/remove-icon/remove-icon.component'
import { MinusIconComponent } from '../../components/icons/minus-icon/minus-icon.component'
import { PlusIconComponent } from '../../components/icons/plus-icon/plus-icon.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    ConvertPipe,
    RemoveIconComponent,
    MinusIconComponent,
    PlusIconComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartService = inject(CartService)
  cartItems = this.cartService.cartItems
  cartCount = this.cartService.cartCount
  totalPrice = this.cartService.totalPrice

  addOneMoreProduct(id: string) {
    this.cartService.addOneMore(id)
  }

  removeOneMoreProduct(id: string) {
    this.cartService.removeOne(id)
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id)
  }
}
