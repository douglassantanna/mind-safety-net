import { Component, Inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PatientService, ViewPatient } from '../../../core/services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    SubmitButtonComponent,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './schedule-appointment.component.html'
})
export class ScheduleAppointmentComponent {
  loading = false;
  scheduleAppointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public patient: ViewPatient,
    private dialogRef: MatDialogRef<ScheduleAppointmentComponent>,) {

    const currentDate = new Date();
    this.scheduleAppointmentForm = this.fb.group({
      patientEmail: [this.patient.email, Validators.required],
      choosenDate: [currentDate, Validators.required],
      choosenHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      choosenMinute: ['', [Validators.required, Validators.min(0), Validators.max(60)]]
    });

  }

  onSubmit() {
    const formData = this.scheduleAppointmentForm.value;

    const formattedDate = this.formatDate(formData.choosenDate);

    const dataToSend = {
      patientEmail: formData.patientEmail,
      choosenDay: formattedDate.day,
      choosenMonth: formattedDate.month,
      choosenYear: formattedDate.year,
      choosenHour: formData.choosenHour,
      choosenMinute: formData.choosenMinute
    };

    this.patientService.scheduleAppointment(this.patient.email, dataToSend).subscribe({
      next: (value) => {
        console.log(value);

        this.dialogRef.close({ dataToSend })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private formatDate(date: Date): any {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const formattedDate = { day, month, year };
    return formattedDate;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
