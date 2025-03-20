import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import { CartService } from '../../shared/services/cart/cart.service'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'
import { RemoveIconComponent } from '../../components/icons/remove-icon/remove-icon.component'
import { MinusIconComponent } from '../../components/icons/minus-icon/minus-icon.component'
import { PlusIconComponent } from '../../components/icons/plus-icon/plus-icon.component'
import { CartFormComponent } from '../../components/cart-form/cart-form.component'
import { ModalService } from '../../shared/services/modal/modal.service'
import { CartFormInterface } from './cart.interface'
import { Router } from '@angular/router'

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
    CartFormComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly modalService = inject(ModalService)
  router = inject(Router)
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

  openModal(template: TemplateRef<{ $implicit: string }>, name: string) {
    if (this.modalService.getModalOptions()) {
      this.modalService.closeModal()
    } else {
      this.modalService.openModal({
        template,
        context: { $implicit: name },
      })
    }
  }

  onBackToMain() {
    this.modalService.closeModal()
    this.router.navigate(['/'])
  }

  cartFormSubmit(template: TemplateRef<{ $implicit: string }>, data: CartFormInterface) {
    this.openModal(template, data.name)
    this.cartService.clearCart()
  }
}
