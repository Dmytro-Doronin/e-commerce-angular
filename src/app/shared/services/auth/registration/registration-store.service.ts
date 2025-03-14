import { inject, Injectable, signal } from '@angular/core'
import { RegistrationApiService } from './registration.api.service'
import { catchError, tap, throwError } from 'rxjs'
import { RegistrationUserData, ResponseUserData } from './registration.interface'

@Injectable({
  providedIn: 'root',
})
export class RegistrationStoreService {
  registrationApiService = inject(RegistrationApiService)
  userSignal = signal<ResponseUserData | null>(null)

  registrationUser(userData: RegistrationUserData) {
    return this.registrationApiService.registrationUser(userData).pipe(
      tap(user => {
        console.log('User registered successfully', user)
        this.userSignal.set(user)
      }),
      catchError(error => {
        console.error('Registration failed', error)
        return throwError(() => error)
      })
    )
  }
}
