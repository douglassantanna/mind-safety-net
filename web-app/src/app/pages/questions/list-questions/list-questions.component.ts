import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { questions } from '../../../core/models/question';
import { FormControl } from '@angular/forms';

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
  questions = questions;
  questionsLenght = questions.length;
  constructor(private questionService: QuestionService) { }
  questionEnabled = new FormControl(true);
  ngOnInit(): void {
    this.questionService.list().subscribe({
      next: (value) => {
        console.log(value);

      },
      error: (err) => {
        console.log(err);

      },
    })

  }
  newQuestion() { }

  toggleQuestionEnable(enable: boolean, index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.questions[index].enable = enable;
    }
  }
}
