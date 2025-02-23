import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { LogoComponent } from '../logo/logo.component'
import { NavigationComponent } from '../navigation/navigation.component'
import { ButtonComponent } from '../ui/button/button.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NavigationComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isOpen = input<boolean>(true)
  isOpenChange = output<boolean>()
  isNavModalOpen = output()

  onMenuClicked() {
    this.isOpenChange.emit(!this.isOpen())
  }

  onNavModalOpen() {
    this.isNavModalOpen.emit()
  }
}
