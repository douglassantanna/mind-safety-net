import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/response';
import { Question } from '../models/question';
import { Priority } from '../models/patients';
const url = `${environment.apiUrl}/patients`;

export interface NewPatient {
  fullName: string;
  email: string;
  questions: Question[];
  phoneNumber?: string;
}

export interface ViewPatients {
  fullName: string;
  email: string;
  priority: Priority;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  create(user: NewPatient): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${url}/create`, user);
  }

  list(): Observable<ViewPatients[]> {
    return this.http.get<ViewPatients[]>(`${url}/list`);
  }
}
