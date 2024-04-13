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

export interface ViewPatient {
  id: number;
  fullName: string;
  email: string;
  priority: Priority;
}

export interface ViewPatientProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  priority: Priority;
  questions: Question[];
  dateSubmittedForm: Date;
}

export interface UpdateSafetyPlan {
  warningSigns: string;
  distractions: string;
  reasonsForLiving: string;
  situationFever: string;
  professionalSupport: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  create(patient: NewPatient): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${url}/create`, patient);
  }

  updateSafetyPlan(request: UpdateSafetyPlan, patientEmail: string): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(`${url}/update-safety-plan/${patientEmail}`, request);
  }

  list(): Observable<ViewPatient[]> {
    return this.http.get<ViewPatient[]>(`${url}/list`);
  }

  getById(patientId: number): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${url}/get-by-id/${patientId}`);
  }

  getSafetyPlanByEmail(patientEmail: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${url}/get-safety-plan-by-email/${patientEmail}`);
  }
}
