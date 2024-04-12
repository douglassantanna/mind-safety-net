import { UpdateSafetyPlan } from './../../../core/services/patient.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientService } from '../../../core/services/patient.service';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { AuthenticationService } from '../../../core/services/authentication.service';

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
    SubmitButtonComponent
  ],
  templateUrl: './safety-plan.component.html'
})
export class SafetyPlanComponent implements OnInit {
  loading = false;
  safetyPlanForm!: FormGroup;
  patientId = 0;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthenticationService) {
    this.safetyPlanForm = this.fb.group({
      warningSigns: ['', Validators.maxLength(1000)],
      distractions: ['', Validators.maxLength(1000)],
      reasonsForLiving: ['', Validators.maxLength(1000)],
      situationFever: ['', Validators.maxLength(1000)],
      professionalSupport: ['', Validators.maxLength(1000)],
      patientId: 0
    });
  }

  ngOnInit(): void {
    this.getPatientId();
  }

  private getPatientId() {
    this.patientId = Number(this.authService.userId);
  }

  submitPost() {
    this.loading = true;

    const request: UpdateSafetyPlan = {
      warningSigns: this.safetyPlanForm.get('warningSigns')?.value,
      distractions: this.safetyPlanForm.get('distractions')?.value,
      reasonsForLiving: this.safetyPlanForm.get('reasonsForLiving')?.value,
      situationFever: this.safetyPlanForm.get('situationFever')?.value,
      professionalSupport: this.safetyPlanForm.get('professionalSupport')?.value,
      patientId: this.patientId
    };
    this.patientService.updateSafetyPlan(request).subscribe({
      next: (response) => {
        console.log(response);

        this.loading = false;
      },
      error: (err) => {
        console.log(err);

        this.loading = false;
      },
    })
  }
}
