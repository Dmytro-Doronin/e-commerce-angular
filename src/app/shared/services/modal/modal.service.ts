import { Injectable, signal } from '@angular/core'
import { ModalContent } from './modal.interface'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly popupTemplateOptionsStore = signal<ModalContent<object> | null>(null)

  getModalOptions(): ModalContent<object> | null {
    return this.popupTemplateOptionsStore()
  }

  openModal<Context extends object>(modalContent: ModalContent<Context>) {
    this.popupTemplateOptionsStore.set(modalContent)
  }

  closeModal() {
    this.popupTemplateOptionsStore.set(null)
  }
}
