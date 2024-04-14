import { Component, Inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PatientService, ViewPatient } from '../../../core/services/patient.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NotificationsService } from '../../../core/services/notifications.service';

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
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './schedule-appointment.component.html'
})
export class ScheduleAppointmentComponent {
  loading = false;
  scheduleAppointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private notificationsService: NotificationsService,
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
    this.loading = true;
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
        this.dialogRef.close({ dataToSend })
        this.loading = false;
        this.notificationsService.showSuccess("Appointment scheduled successfully!");
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.notificationsService.showError("An error occurred");
      },
    });
  }

  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const selectedDate = d || new Date();
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      return false;
    }
    return selectedDate > currentDate;
  };


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
