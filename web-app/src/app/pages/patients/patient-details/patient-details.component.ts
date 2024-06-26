import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { PatientService, NewPatient } from '../../../core/services/patient.service';
import { MatButtonModule } from '@angular/material/button';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    SubmitButtonComponent,
    MatButtonModule
  ],
  templateUrl: './patient-details.component.html'
})
export class PatientDetailsComponent {
  patientDetailsForm: FormGroup;
  title = 'Please, tell us your personal details.';
  loading = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatientDetailsComponent>,
    private patientService: PatientService,
    private notificationsService: NotificationsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.patientDetailsForm = this.fb.group({
      fullName: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.maxLength(20)]],
      questions: this.fb.array([])
    });
  }

  onSubmit() {
    this.loading = true;
    const newPatient: NewPatient = {
      fullName: this.patientDetailsForm.get('fullName')?.value,
      email: this.patientDetailsForm.get('email')?.value,
      phoneNumber: this.patientDetailsForm.get('phoneNumber')?.value,
      questions: this.data.questions
    };

    this.patientService.create(newPatient).subscribe({
      next: (response) => {
        const patientId = response;
        this.dialogRef.close({ patientId });
        this.loading = false;
        this.notificationsService.showSuccess("Your account were created successfully");
        this.router.navigateByUrl('patients/advices');
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.notificationsService.showError("An error occurred");
      },
    });
  }
  get emailFormControl() {
    return this.patientDetailsForm.get('email') as FormControl;
  }
}
