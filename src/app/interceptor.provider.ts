import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProfileInterceptor } from './shared/interceptors/profile.interceptor'

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ProfileInterceptor, multi: true },
]
