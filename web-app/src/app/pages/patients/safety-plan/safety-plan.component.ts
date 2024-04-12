import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-safety-plan',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './safety-plan.component.html'
})
export class SafetyPlanComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  safetyPlanForm = this.fb.group({
    warningSigns: ['', [Validators.required, Validators.maxLength(1000)]],
    distractions: ['', [Validators.required, Validators.maxLength(1000)]],
    reasonsForLiving: ['', [Validators.required, Validators.maxLength(1000)]],
    situationFever: ['', [Validators.required, Validators.maxLength(1000)]],
    professionalSupport: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
  }

  submitPost() {
    console.log(this.safetyPlanForm.value);
  }
}
