import { computed, inject, Injectable, signal } from '@angular/core'
import { LoginApiService } from './login-api.service'
import { loginInputData, profileResponseData } from './login.interface'
import { catchError, Observable, of, Subscription, switchMap, tap, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { AlertService } from '../../alert/alert.service'
import { ErrorType } from '../../errors.interface'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class LoginStoreService {
  private cookieService = inject(CookieService)
  private loginApiService = inject(LoginApiService)
  private alertService = inject(AlertService)
  loginSubscription: Subscription | null = null
  profileSubscription: Subscription | null = null
  private accessToken = signal<string | null>(this.getAccessToken())
  user = signal<profileResponseData | null>(null)
  isAuthenticated = computed(() => this.accessToken() !== null)

  login(userData: loginInputData): Observable<unknown> {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe()
    }

    return this.loginApiService.loginUser(userData).pipe(
      tap(response => {
        this.cookieService.set('accessToken', response.access_token, {
          path: '/',
          secure: true,
          sameSite: 'Lax',
        })

        this.cookieService.set('refreshToken', response.refresh_token, {
          path: '/',
          sameSite: 'None',
          secure: false,
        })

        this.getProfile()
        this.alertService.onOpenAlert({ message: 'Login success', status: 'success' })
      }),
      catchError((error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        return throwError(() => error)
      })
    )
  }

  getProfile() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe()
    }

    this.profileSubscription = this.loginApiService.getUserProfile().subscribe({
      next: user => {
        this.user.set(user)
        this.profileSubscription = null
      },
      error: (error: ErrorType) => {
        this.alertService.onOpenAlert({ message: error.message, status: 'error' })
        this.logout()
      },
      complete: () => {
        this.profileSubscription = null
      },
    })
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      this.logout()
      return throwError(() => new Error('No refresh token available'))
    }

    return this.loginApiService.refreshAccessToken(refreshToken).pipe(
      switchMap(response => {
        if (!response.access_token) {
          return throwError(() => new Error('Invalid refresh response'))
        }

        this.cookieService.set('access_token', response.access_token, {
          path: '/',
          secure: true,
          sameSite: 'Lax',
        })

        return of(response.access_token)
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.logout()
          }

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

  getAccessToken(): string | null {
    return this.cookieService.get('accessToken') || null
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refreshToken') || null
  }

  logout(): void {
    this.cookieService.delete('accessToken', '/')
    this.cookieService.delete('refreshToken', '/')
    this.user.set(null)
    this.alertService.onOpenAlert({
      message: 'You have been logged out',
      status: 'success',
    })
  }
}
