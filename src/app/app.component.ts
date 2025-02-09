import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { AsideComponent } from './components/aside/aside.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { categoriesMock } from './shared/categories.mock'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AsideComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal(false)

  categories = categoriesMock.map(item => item.name)
}
