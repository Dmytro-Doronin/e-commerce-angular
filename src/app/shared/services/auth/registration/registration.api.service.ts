import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RegistrationUserData, ResponseUserData } from './registration.interface'

@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService {
  httpClient = inject(HttpClient)
  baseUrl = 'https://api.escuelajs.co/api/v1'

  registrationUser(userData: RegistrationUserData): Observable<ResponseUserData> {
    return this.httpClient.post<ResponseUserData>(`${this.baseUrl}/users`, userData)
  }
}
