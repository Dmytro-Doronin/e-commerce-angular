import { inject, Injectable, signal } from '@angular/core'
import { RegistrationApiService } from './registration.api.service'
import { catchError, tap, throwError } from 'rxjs'
import { RegistrationUserData, ResponseUserData } from './registration.interface'
import { AlertService } from '../../alert/alert.service'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class RegistrationStoreService {
  registrationApiService = inject(RegistrationApiService)
  userSignal = signal<ResponseUserData | null>(null)
  alertService = inject(AlertService)

  registrationUser(userData: RegistrationUserData) {
    return this.registrationApiService.registrationUser(userData).pipe(
      tap(user => {
        this.alertService.onOpenAlert({ message: 'User was registered', status: 'success' })
        this.userSignal.set(user)
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          this.alertService.onOpenAlert({
            message: error.error?.message || 'unknown error',
            status: 'error',
          })
        } else {
          this.alertService.onOpenAlert({
            message: 'Something went wrong',
            status: 'error',
          })
        }

        return throwError(() => error)
      })
    )
  }
}
