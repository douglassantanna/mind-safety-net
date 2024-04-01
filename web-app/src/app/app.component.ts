import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Answer, Question, Score, myScores, questions } from './core/models/question';
import { QuestionService } from './services/question.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/authentication/login/login.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { AuthenticationService } from './core/services/authentication.service';
import { NavComponent } from './layout/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    LoginComponent,
    ListUsersComponent,
    NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  scores = myScores;
  questions = questions;
  questionsLenght = questions.length;
  messageScore = '';
  questionsForm: FormGroup = {} as FormGroup;
  constructor(
    public authService: AuthenticationService,
    private questionService: QuestionService,
    private fb: FormBuilder) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  onSubmit() { }
  setCheckedAnswers(question: Question, answer: Answer, index: number) {
    var listOfQuestions = this.questionsArray.value;
    listOfQuestions.sort((a: any, b: any) => a.questionIdentifier - b.questionIdentifier);
    let isChecked = listOfQuestions[index]?.answerId === answer.id
      && listOfQuestions[index]?.questionIdentifier === question.id;
    return isChecked;
  }
  setQuestions(question: Question, answer: Answer, index: number) {
    const questionList = this.questionsArray.value;
    const control = this.fb.control({
      questionId: question.id,
      answerId: answer.id,
      answerValue: answer.value
    })
    this.questionsArray.push(control)
    if (questionList[index]?.questionId == question.id) {
      this.questionsArray.removeAt(index);
    }
    this.questionsValueSum();
  }

  questionsValueSum() {
    let score = 0;
    const questionList = this.questionsArray.value;
    score = questionList.reduce((acc: any, question: any) => acc + question.answerValue, 0);
    const closestMatch = this.findClosestScore(score);
    if (closestMatch) {
      this.messageScore = closestMatch.description;
    }
  }

  findClosestScore(finalScore: number): Score {
    let closestScore: Score | undefined = undefined;
    let minDifference = Number.MAX_VALUE;

    for (const score of myScores) {
      const difference = Math.abs(finalScore - score.value);
      if (difference < minDifference) {
        minDifference = difference;
        closestScore = score;
      }
    }

    return closestScore!;
  }
  get questionsArray() { return this.questionsForm.get('questions') as FormArray; }
}
