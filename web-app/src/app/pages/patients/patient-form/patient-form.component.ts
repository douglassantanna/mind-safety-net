import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Answer, Question, Score, myScores, questions } from '../../../core/models/question';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { QuestionService } from '../../../services/question.service';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    SubmitButtonComponent
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent {
  scores = myScores;
  questions = questions;
  questionsLenght = questions.length;
  messageScore = '';
  questionsForm: FormGroup = {} as FormGroup;
  loading = false;

  constructor(
    public authService: AuthenticationService,
    private questionService: QuestionService,
    private fb: FormBuilder) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

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
