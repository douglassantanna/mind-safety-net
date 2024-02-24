import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { CustomResponse } from '../models/response';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LocalStorageService } from './local-storage.service';
const url = `${environment.apiUrl}/authentication`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login(email: string, password: string): Observable<CustomResponse> {
    const credentials = {
      email: email,
      password: password
    } as LoginRequest
    return this.http.post<CustomResponse>(`${url}/login`, credentials).pipe(
      tap((response: any) => {
        const { token } = response;
        this.localStorageService.setToken(token);
      })
    );
  }
}
