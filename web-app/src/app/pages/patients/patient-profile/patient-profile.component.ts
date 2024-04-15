import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PatientService, ViewPatientProfile } from '../../../core/services/patient.service';
import { CommonModule } from '@angular/common';
import { PatientPriorityComponent } from '../../../layout/patient-priority/patient-priority.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    PatientPriorityComponent,
    MatIconModule,
    RouterLink],
  templateUrl: './patient-profile.component.html',
})
export class PatientProfileComponent implements OnInit {
  patient: ViewPatientProfile = {} as ViewPatientProfile;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private notificationsService: NotificationsService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const email = params['email'];
      this.patientService.getByEmail(email).subscribe({
        next: (response) => {
          this.patient = response.data;
        },
        error: (err) => {
          console.log(err);
          this.notificationsService.showError("An error occurred");
        },
      })
    });
  }

}
