import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, ViewUser } from '../models/user';
import { CustomResponse } from '../models/response';
const url = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<ViewUser[]> {
    return this.http.get<ViewUser[]>(`${url}/list`)
  }

  create(user: NewUser): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${url}/create`, user);
  }

  edit(user: NewUser): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(`${url}/edit`, user);
  }
}
