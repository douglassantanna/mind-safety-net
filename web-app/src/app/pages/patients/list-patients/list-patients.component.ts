import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientService, ViewPatient } from '../../../core/services/patient.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleAppointmentComponent } from '../schedule-appointment/schedule-appointment.component';
@Component({
  selector: 'app-list-patients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PatientPriorityComponent,
    MatTooltipModule
  ],
  templateUrl: './list-patients.component.html'
})
export class ListPatientsComponent implements OnInit {
  patients: ViewPatient[] = [];
  scheduleAppointmentDate = new Date();

  displayedColumns = ['fullName', 'email', 'dateSubmittedForm', 'priority', 'scheduleAppointment', 'actions'];
  constructor(
    private patientService: PatientService,
    private router: Router,
    private dialog: MatDialog,) {
  }
  ngOnInit(): void {
    this.patientService.list().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  patientDetails(patient: ViewPatient) {
    this.router.navigateByUrl(`/patients/profile/${patient.id}`);
  }

  scheduleAppointment(patient: ViewPatient) {
    const dialogRef = this.dialog.open(ScheduleAppointmentComponent, {
      data: patient,
      width: '350px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { choosenDay, choosenMonth, choosenYear, choosenHour, choosenMinute } = result.dataToSend;
        const day = Number(choosenDay);
        const month = Number(choosenMonth);
        const year = Number(choosenYear);
        const hours = Number(choosenHour);
        const minutes = Number(choosenMinute);

        patient.appointment = new Date(year, month - 1, day, hours, minutes);
        patient.isScheduled = true;
      }
    })
  }
}
