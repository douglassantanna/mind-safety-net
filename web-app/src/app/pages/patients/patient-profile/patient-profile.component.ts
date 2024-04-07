import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService, ViewPatientProfile } from '../../../core/services/patient.service';
import { CommonModule } from '@angular/common';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    PatientPriorityComponent],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {
  patient: ViewPatientProfile = {} as ViewPatientProfile;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.patientService.getById(id).subscribe({
        next: (response) => {
          this.patient = response.data;
          console.log(response.data);

        },
        error: (err) => {
          console.log(err);

        },
      })
    });
  }

}
