import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { categoriesMock } from './shared/categories.mock'
import { ModalComponent } from './components/modal/modal.component'
import { Category } from './shared/categories.interface'
import { CarouselComponent } from './components/carousel/carousel.component'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, ModalComponent, CarouselComponent, RouterOutlet],
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
  }

  closeMenuModal() {
    this.isOpenNavigationModal.set(false)
  }
}
