import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { loginInputData, loginResponseData, profileResponseData } from './login.interface'

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  httpClient = inject(HttpClient)
  baseUrl = 'https://api.escuelajs.co/api/v1'

  loginUser(userData: loginInputData): Observable<loginResponseData> {
    return this.httpClient.post<loginResponseData>(`${this.baseUrl}/auth/login`, userData)
  }

  getUserProfile(): Observable<profileResponseData> {
    return this.httpClient.get<profileResponseData>(`${this.baseUrl}/auth/profile`)
  }

  // refreshAccessToken(refreshToken: string): Observable<{ access_token: string }> {
  //   return this.httpClient.post<{ access_token: string }>(
  //     'https://api.escuelajs.co/api/v1/auth/refresh-token',
  //     { refreshToken }
  //   )
  // }
  refreshAccessToken(refreshToken: string): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(
      'https://api.escuelajs.co/api/v1/auth/refresh-token',
      { refreshToken }
    )
  }
}
