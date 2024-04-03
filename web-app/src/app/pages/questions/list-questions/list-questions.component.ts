import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [],
  templateUrl: './list-questions.component.html'
})
export class ListQuestionsComponent implements OnInit {

  constructor(private questionService: QuestionService) { }

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


}
