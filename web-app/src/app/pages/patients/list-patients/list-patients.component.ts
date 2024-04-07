import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientService, ViewPatient } from '../../../core/services/patient.service';
import { Router } from '@angular/router';
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
  displayedColumns = ['fullName', 'email', 'dateSubmittedForm', 'priority', 'actions'];
  constructor(
    private patientService: PatientService,
    private router: Router) {
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
}
