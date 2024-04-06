import { SetQuestionEnableStatus } from './../../../core/models/question';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Question, questions } from '../../../core/models/question';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule
  ],
  templateUrl: './list-questions.component.html'
})
export class ListQuestionsComponent implements OnInit {
  questions: Question[] = [];
  questionsLenght = questions.length;
  questionEnabled = new FormControl(true);

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.list().subscribe({
      next: (questions) => {
        this.questions = questions;
      },
      error(err) {
        console.log(err);
      },
    })
  }

  newQuestion() {
    const dialogRef = this.dialog.open(CreateQuestionComponent, {
      width: '800px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadQuestions();
    })
  }

  toggleQuestionEnable(enable: boolean, index: number, question: Question): void {
    const questionToEdit: SetQuestionEnableStatus = { questionId: question.id, enableStatus: enable };

    this.questionService.setQuestionEnabledStatus(questionToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if (index >= 0 && index < this.questions.length) {
          this.questions[index].enabled = enable;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
