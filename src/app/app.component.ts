import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { categoriesMock } from './shared/categories.mock'
import { ModalComponent } from './components/modal/modal.component'
import { Category } from './shared/categories.interface'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal<boolean>(false)
  isOpenNavigationModal = signal<boolean>(false)
  categories: Category[] = categoriesMock

  openMenuModal() {
    this.isOpenNavigationModal.set(true)
    console.log(this.isOpenNavigationModal())
  }

  closeMenuModal() {
    this.isOpenNavigationModal.set(false)
  }
}
