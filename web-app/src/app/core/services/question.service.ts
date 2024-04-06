import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateQuestion, Question, SetQuestionEnableStatus } from '../models/question';
import { CustomResponse } from '../models/response';
const url = `${environment.apiUrl}/questions`;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  create(question: CreateQuestion): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${url}/create`, question);
  }

  list(): Observable<Question[]> {
    return this.http.get<Question[]>(`${url}/list`);
  }
  setQuestionEnabledStatus(question: SetQuestionEnableStatus): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(`${url}/set-enable-status`, question);
  }

}
