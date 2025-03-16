import { Injectable, signal } from '@angular/core'
import { alertContent, AlertStatuses } from './alert.interface'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = signal<{ message: string; status: AlertStatuses } | null>(null)
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  onOpenAlert(content: alertContent) {
    this.alert.set({ message: content.message, status: content.status })

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this.closeAlert()
    }, 5000)
  }

  closeAlert() {
    this.alert.set(null)
  }
}
