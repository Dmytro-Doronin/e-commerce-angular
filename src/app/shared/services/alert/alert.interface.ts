import { TemplateRef } from '@angular/core'

export interface AlertContent<T extends object> {
  template: TemplateRef<T>
  context: T
}

export type AlertStatuses = 'error' | 'success'

export interface alertContent {
  message: string
  status: AlertStatuses
}
