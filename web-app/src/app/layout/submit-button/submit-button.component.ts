import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  template: `
  <ng-container *ngIf="loading;else load">
    <button mat-raised-button color="primary" type="button" (click)="submitForm()" [disabled]="disabled">{{ text }}</button>
  </ng-container>
  <ng-template #load>
    <button mat-raised-button color="primary" [disabled]="disabled">
      <img src="../../../assets/loading-spinner.gif" alt="Loading">
    </button>
  </ng-template>
  `,
  styles: [`
  button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
  min-width: 105px;
  transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }
  img {
    width:15px;
  }
`]
})
export class SubmitButtonComponent {
  @Input() text = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  submitForm(): void {
    this.submit.emit();
  }
}
