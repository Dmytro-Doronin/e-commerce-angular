import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  isOpen = input<boolean>(false)
  isOpenChange = output<boolean>()

  @HostListener('click', ['$event'])
  onModalClick(event: Event) {
    const target = event.target as HTMLElement

    if (target.classList.contains('modal')) {
      this.isOpenChange.emit(!this.isOpen())
    }
  }
}
