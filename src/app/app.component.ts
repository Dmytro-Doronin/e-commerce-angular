import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { categoriesMock } from './shared/categories.mock'
import { ModalComponent } from './components/modal/modal.component'
import { Category } from './shared/categories.interface'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ModalComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal<boolean>(false)
  categories: Category[] = categoriesMock
}
