import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core'
import { ModalService } from '../../shared/services/modal/modal.service'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-visible]': 'getTemplateOptions()?.template',
  },
})
export class ModalComponent {
  isOpen = input<boolean>(false)
  isOpenChange = output<boolean>()
  private readonly modalService = inject(ModalService)

  getTemplateOptions(): ReturnType<ModalService['getModalOptions']> {
    return this.modalService.getModalOptions()
  }

  onModalClose() {
    this.modalService.closeModal()
  }

  @HostListener('click', ['$event'])
  onModalClick(event: Event) {
    const target = event.target as HTMLElement

    if (target.classList.contains('modal')) {
      this.onModalClose()
    }
  }
}
