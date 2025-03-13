import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core'
import { map } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { ProductsStoreService } from '../../shared/services/products/products-store.service'
import { NgTemplateOutlet } from '@angular/common'
import { ConvertPipe } from '../../shared/pipes/convert-pipe/convert.pipe'
import { ButtonComponent } from '../../components/ui/button/button.component'
import { CartService } from '../../shared/services/cart/cart.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { CheckIconComponent } from '../../components/icons/check-icon/check-icon.component'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgTemplateOutlet, ConvertPipe, ButtonComponent, LoaderComponent, CheckIconComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  productsStoreService = inject(ProductsStoreService)

  id = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))))
  product = this.productsStoreService.product
  productLoading = this.productsStoreService.productLoading
  selectedImage: string | null = null

  constructor() {
    this.loadNewProduct()
    this.selectProductImg()
  }

  loadNewProduct() {
    effect(
      () => {
        const id = this.id()
        if (id) {
          this.productsStoreService.loadProduct(id)
        }
      },
      { allowSignalWrites: true }
    )
  }

  selectProductImg() {
    effect(() => {
      const product = this.product()
      if (product && product.images?.length) {
        this.selectedImage = product.images[0]
      }
    })
  }

  setImage(image: string) {
    this.selectedImage = image
  }

  inCart() {
    return this.cartService.isInCart(this.product()!)
  }

  onAddToCard() {
    if (this.inCart()) {
      this.cartService.removeFromCart(this.product()!.id)
    } else {
      this.cartService.addToCart(this.product()!)
    }
  }
}
