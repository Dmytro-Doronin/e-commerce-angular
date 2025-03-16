import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { ModalComponent } from './components/modal/modal.component'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
import { CategoriesStoreService } from './shared/services/categories/categories-store.service'
import { LoginStoreService } from './shared/services/auth/login/login-store.service'
import { AlertService } from './shared/services/alert/alert.service'
import { AlertComponent } from './components/alert/alert.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ModalComponent, RouterOutlet, FooterComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal<boolean>(false)
  loginStoreService = inject(LoginStoreService)
  alertService = inject(AlertService)

  private readonly categoriesService = inject(CategoriesStoreService)
  readonly categories = this.categoriesService.allCategories

  constructor() {
    this.categoriesService.loadAllCategories()

    if (this.loginStoreService.isAuthenticated()) {
      this.loginStoreService.getProfile()
    }
  }
}
