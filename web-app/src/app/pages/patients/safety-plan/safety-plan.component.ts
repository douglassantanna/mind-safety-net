import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-safety-plan',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './safety-plan.component.html'
})
export class SafetyPlanComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  post = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(256)]]
  });
  name = 'Douglas'
  plans = [
    {
      title: "My warning signs",
      message: ""
    },
    {
      title: "My distractions",
      message: ""
    },
    {
      title: "Professional support",
      message: ""
    },
    {
      title: "Making my situation safer",
      message: ""
    },
    {
      title: "My reasons for living",
      message: ""
    },
  ];

  ngOnInit(): void {
  }

  submitPost() { }

}
