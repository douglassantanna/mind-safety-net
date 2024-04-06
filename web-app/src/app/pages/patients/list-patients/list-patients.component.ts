import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';
import { MatTooltipModule } from '@angular/material/tooltip';
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
export class ListPatientsComponent {
  patients = [
    {
      id: 1,
      fullName: "Patient 1",
      email: "patient1@example.com",
      "priority": 3
    },
    {
      id: 2,
      fullName: "Patient 2",
      email: "patient2@example.com",
      "priority": 2
    },
    {
      id: 3,
      fullName: "Patient 3",
      email: "patient3@example.com",
      "priority": 1
    },
    {
      id: 4,
      fullName: "Patient 4",
      email: "patient4@example.com",
      "priority": 3
    },
    {
      id: 5,
      fullName: "Patient 5",
      email: "patient5@example.com",
      "priority": 2
    },
    {
      id: 6,
      fullName: "Patient 6",
      email: "patient6@example.com",
      "priority": 1
    },
    {
      id: 7,
      fullName: "Patient 7",
      email: "patient7@example.com",
      "priority": 3
    },
    {
      id: 8,
      fullName: "Patient 8",
      email: "patient8@example.com",
      "priority": 2
    },
    {
      id: 9,
      fullName: "Patient 9",
      email: "patient9@example.com",
      "priority": 1
    },
    {
      "id": 10,
      "fullName": "Patient 10",
      "email": "patient10@example.com",
      "priority": 3
    }
  ]
  displayedColumns = ['fullName', 'email', 'priority', 'actions'];
  patientDetails(patient: any) { }
}
