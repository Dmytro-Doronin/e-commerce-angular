import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NavigationComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly modalService = inject(ModalService)

  categories = input<Category[] | null>(null)
  isOpen = input<boolean>(true)
  isOpenChange = output<boolean>()
  isNavModalOpen = output()

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

  onMenuClicked() {
    this.isOpenChange.emit(!this.isOpen())
  }
}
