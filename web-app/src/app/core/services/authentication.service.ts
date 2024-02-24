import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { CustomResponse } from '../models/response';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
const url = `${environment.apiUrl}/Authentication`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginRequest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${url}/login`, credentials).pipe(
      tap((response: CustomResponse) => {
        // this.setToken(response.data.token);
      })
    );
  }
}
