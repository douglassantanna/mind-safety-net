import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
const url = `${environment.apiUrl}/questions`;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  create(question: any): Observable<any> {
    return this.http.post<any>(`${url}/create`, question);
  }

  list(): Observable<Question[]> {
    return this.http.get<Question[]>(`${url}/list`);
  }
}
