import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent {
  createQuestionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<CreateQuestionComponent>) {
    this.createQuestionForm = this.formBuilder.group({
      description: ['', [Validators.maxLength(500), Validators.required]],
      answers: this.formBuilder.array([
        this.createAnswerFormGroup()
      ])
    });
  }

  createAnswerFormGroup(): FormGroup {
    return this.formBuilder.group({
      description: ['', [Validators.maxLength(500), Validators.required]],
      value: [null, Validators.required]
    });
  }

  addAnswer(): void {
    const answersArray = this.createQuestionForm.get('answers') as FormArray;
    answersArray.push(this.createAnswerFormGroup());
  }

  removeAnswer(index: number): void {
    const answersArray = this.createQuestionForm.get('answers') as FormArray;
    answersArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.createQuestionForm.valid) {
      this.questionService.create(this.createQuestionForm.value).subscribe({
        next: (value) => {
          this.dialogRef.close({
            questionId: value
          })
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }

  get questionDescriptionFormControl() {
    return this.createQuestionForm.get('description') as FormControl;
  }
  get answerFormArray() {
    return this.createQuestionForm.get('answers') as FormArray;
  }
  get answerDescriptionFormControl() {
    return this.answerFormArray.get('description') as FormControl;
  }
  get answerValueFormControl() {
    return this.answerFormArray.get('value') as FormControl;
  }
}