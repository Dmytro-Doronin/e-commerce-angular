import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core'
import { LogoComponent } from '../logo/logo.component'
import { NavigationComponent } from '../navigation/navigation.component'
import { ButtonComponent } from '../ui/button/button.component'
import { ModalService } from '../../shared/services/modal/modal.service'
import { Category } from '../../shared/services/categories/categories.interface'
import { SearchPanelComponent } from '../search-panel/search-panel.component'
import { RouterLink } from '@angular/router'
import { CartService } from '../../shared/services/cart/cart.service'
import { LoginFormComponent } from '../login-form/login-form.component'
import { RegistrationFormComponent } from '../registration-form/registration-form.component'
import { CategoriesComponent } from '../icons/categories/categories.component'
import { SearchIconComponent } from '../icons/search-icon/search-icon.component'
import { UserIconComponent } from '../icons/user-icon/user-icon.component'
import { CartIconComponent } from '../icons/cart-icon/cart-icon.component'
import { LoginStoreService } from '../../shared/services/auth/login/login-store.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    NavigationComponent,
    ButtonComponent,
    SearchPanelComponent,
    RouterLink,
    LoginFormComponent,
    RegistrationFormComponent,
    CategoriesComponent,
    SearchIconComponent,
    UserIconComponent,
    CartIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly modalService = inject(ModalService)
  private readonly cartService = inject(CartService)
  private readonly loginStoreService = inject(LoginStoreService)

  cartCount = this.cartService.cartCount
  categories = input<Category[] | null>(null)
  isOpen = input<boolean>(true)
  isOpenChange = output<boolean>()
  isNavModalOpen = output()
  userImg = computed(() => this.loginStoreService.user()?.avatar)

  openModal(template: TemplateRef<{ $implicit: Category[] }>) {
    if (this.modalService.getModalOptions()) {
      this.modalService.closeModal()
    } else {
      this.modalService.openModal({
        template,
        context: { $implicit: this.categories() },
      })
    }
  }

  openFormModal(template: TemplateRef<{ $implicit: null }>) {
    if (this.modalService.getModalOptions()?.template === template) {
      return
    }
    this.modalService.closeModal()
    setTimeout(() => {
      this.modalService.openModal({
        template,
        context: { $implicit: null },
      })
    }, 100)
  }

  closeModal() {
    this.modalService.closeModal()
  }

  onMenuClicked() {
    if (!this.isOpen()) {
      this.lockScroll()
      this.isOpenChange.emit(!this.isOpen())
    } else {
      this.unlockScroll()
      this.isOpenChange.emit(!this.isOpen())
    }
  }

  private lockScroll() {
    document.body.style.overflow = 'hidden'
  }

  private unlockScroll() {
    document.body.style.overflow = 'auto'
  }
}
