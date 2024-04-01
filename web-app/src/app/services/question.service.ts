import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../core/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  submitQuestions(questions: Question[]): Observable<any> {
    console.log(questions);
    return this.http.post<any>('', questions);
  }
  loadQuestions() { }
}
