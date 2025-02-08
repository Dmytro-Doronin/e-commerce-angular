import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMenuOpen = signal(false)
}
