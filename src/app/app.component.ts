import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { ModalComponent } from './components/modal/modal.component'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
import { CategoriesStoreService } from './shared/services/categories/categories-store.service'
import { LoginStoreService } from './shared/services/auth/login/login-store.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ModalComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal<boolean>(false)
  loginStoreService = inject(LoginStoreService)
  // categories: Category[] = categoriesMock
  private readonly categoriesService = inject(CategoriesStoreService)
  readonly categories = this.categoriesService.allCategories

  constructor() {
    this.categoriesService.loadAllCategories()
    this.loginStoreService.getProfile()
  }
}
