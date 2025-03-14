import { Injectable, inject } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, catchError, switchMap, throwError } from 'rxjs'
import { LoginStoreService } from '../services/auth/login/login-store.service'

@Injectable()
export class ProfileInterceptor implements HttpInterceptor {
  private loginService = inject(LoginStoreService)

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getAccessToken()

    if (req.method === 'GET' && req.url.includes('/auth/profile') && token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            return this.loginService.refreshToken().pipe(
              switchMap(newToken => {
                const updatedRequest = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                })
                return next.handle(updatedRequest)
              }),
              catchError(refreshError => {
                this.loginService.logout()
                return throwError(() => refreshError)
              })
            )
          }
          return throwError(() => error)
        })
      )
    }

    return next.handle(req)
  }
}
