import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { CustomResponse } from '../models/response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
const url = `${environment.apiUrl}/authentication`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedIn$.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    if (this.token)
      this.isLoggedIn$.next(true);
  }

  login(email: string, password: string): Observable<CustomResponse> {
    const credentials = {
      email: email,
      password: password
    } as LoginRequest
    return this.http.post<CustomResponse>(`${url}/login`, credentials).pipe(
      tap((response: any) => {
        const { token } = response;
        this.isLoggedIn$.next(true);
        this.localStorageService.setToken(token);
      })
    );
  }

  logout(): void {
    this.localStorageService.removeToken();
    this.isLoggedIn$.next(false);
    this.router.navigateByUrl('login');
  }

  get role(): string {
    try {
      const token = this.localStorageService.getToken();
      const decodedToken = jwtDecode(token as string) as {
        role: string
      };

      if (decodedToken)
        return decodedToken.role.toLocaleLowerCase();
    } catch (error) {
      console.log(error);
    }
    return '';
  }

  private get token(): string {
    return this.localStorageService.getToken();
  }
}
