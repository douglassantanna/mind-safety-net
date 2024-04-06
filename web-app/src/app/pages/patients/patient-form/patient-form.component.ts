import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Answer, Question } from '../../../core/models/question';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { MatDialog } from '@angular/material/dialog';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    SubmitButtonComponent,
  ],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {
  questionList: Question[] = [];
  messageScore = '';
  questionsForm: FormGroup = {} as FormGroup;
  loading = false;

  constructor(
    public authService: AuthenticationService,
    private dialog: MatDialog,
    private questionService: QuestionService,
    private fb: FormBuilder) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.updateQuestionList();
  }

  updateQuestionList(): void {
    this.questionService.list().subscribe({
      next: (questions) => {
        this.questionList = questions.filter(question => question.enabled);
      },
      error: (err) => {
        console.log(err);
      },
    })
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
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(PatientDetailsComponent, {
      width: '350px',
      height: '430px',
      data: this.questionsForm.value
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('ok');
    })
  }
  get questionsArray() { return this.questionsForm.get('questions') as FormArray; }

}
