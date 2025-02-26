import { TemplateRef } from '@angular/core'

export interface ModalContent<T extends object> {
  template: TemplateRef<T>
  context: T
}
