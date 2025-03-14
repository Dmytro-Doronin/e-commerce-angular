import { computed, inject, Injectable, signal } from '@angular/core'
import { LoginApiService } from './login-api.service'
import { loginInputData, profileResponseData } from './login.interface'
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class LoginStoreService {
  private cookieService = inject(CookieService)
  private loginApiService = inject(LoginApiService)
  loginSubscription: Subscription | null = null
  profileSubscription: Subscription | null = null

  user = signal<profileResponseData | null>(null)
  isAuthenticated = computed(() => this.user()?.name)

  login(userData: loginInputData) {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe()
    }

    this.loginSubscription = this.loginApiService.loginUser(userData).subscribe({
      next: response => {
        this.cookieService.set('access_token', response.access_token, { path: '/', secure: true })
        this.cookieService.set('refresh_token', response.refresh_token, { path: '/', secure: true })
        this.getProfile()
        this.loginSubscription = null
        console.log('login successes')
      },
      error: error => {
        console.log('login', error)
      },
      complete: () => {
        this.loginSubscription = null
      },
    })
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
      error: error => {
        console.log('profile', error)
      },
      complete: () => {
        this.profileSubscription = null
      },
    })
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'))
    }

    return this.loginApiService.refreshAccessToken(refreshToken).pipe(
      switchMap(response => {
        this.cookieService.set('access_token', response.access_token, { path: '/', secure: true })
        return response.access_token
      }),
      catchError(error => {
        this.logout()
        return throwError(() => error)
      })
    )
  }

  getAccessToken(): string | null {
    return this.cookieService.get('access_token') || null
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refresh_token') || null
  }

  logout(): void {
    this.cookieService.delete('access_token', '/')
    this.cookieService.delete('refresh_token', '/')
    this.user.set(null)
  }
}
