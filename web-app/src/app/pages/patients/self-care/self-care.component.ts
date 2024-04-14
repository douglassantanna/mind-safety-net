import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { CustomResponse } from '../../../core/models/response';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { PatientService, UpdateSelfCare } from '../../../core/services/patient.service';

@Component({
  selector: 'app-self-care',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    SubmitButtonComponent],
  templateUrl: './self-care.component.html'
})
export class SelfCareComponent {
  loading = false;
  selfCareForm!: FormGroup;
  patientEmail = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthenticationService) {
    this.selfCareForm = this.fb.group({
      positivePoints: ['', Validators.maxLength(1000)],
      pointsToImprove: ['', Validators.maxLength(1000)],
      strategies: ['', Validators.maxLength(1000)]
    });
  }

  ngOnInit(): void {
    this.getPatientEmail();

    this.retrievePopulatedSelfCareForm();
  }

  submitPost() {
    this.loading = true;

    const request: UpdateSelfCare = {
      positivePoints: this.selfCareForm.get('positivePoints')?.value,
      pointsToImprove: this.selfCareForm.get('pointsToImprove')?.value,
      strategies: this.selfCareForm.get('strategies')?.value
    };

    this.patientService.updateSelfCare(request, this.patientEmail).subscribe({
      next: (response) => {
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    })
  }

  private retrievePopulatedSelfCareForm() {
    this.patientService.getSelfCareByEmail(this.patientEmail).subscribe({
      next: (response) => {
        this.updateSelfCareForm(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private updateSelfCareForm(response: CustomResponse) {
    if (response) {
      const form = response.data as UpdateSelfCare;
      this.selfCareForm.patchValue({
        positivePoints: form.positivePoints,
        pointsToImprove: form.pointsToImprove,
        strategies: form.strategies
      });
    }
  }

  private getPatientEmail() {
    this.patientEmail = this.authService.userEmail;
  }
}
