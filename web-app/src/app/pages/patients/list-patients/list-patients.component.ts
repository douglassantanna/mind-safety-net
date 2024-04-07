import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientService, ViewPatients } from '../../../core/services/patient.service';
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
  patients: ViewPatients[] = [];
  displayedColumns = ['fullName', 'email', 'priority', 'actions'];
  constructor(private patientService: PatientService) {
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
  patientDetails(patient: any) { }
}
