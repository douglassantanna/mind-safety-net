import { Component, OnInit } from '@angular/core';
import { PatientService, ViewPatientProfile } from '../../../core/services/patient.service';
import { NgFor } from '@angular/common';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Priority } from '../../../core/models/patients';
import { NotificationsService } from '../../../core/services/notifications.service';
export interface Advice {
  messages: Message[];
  priority: Priority;
}
export interface Message {
  title: string;
  description: string;
}
const advicesArray: Advice[] = [
  {
    priority: Priority.Low,
    messages: [
      {
        title: 'Low Level Scores:',
        description: 'Low level scores typically indicate mild or minimal symptoms of mental health issues. Individuals with low scores may experience occasional stress or mood fluctuations but can generally manage daily activities without significant impairment.'
      }
    ]
  },
  {
    priority: Priority.Medium,
    messages: [
      {
        title: 'Medium Level Scores:',
        description: 'Medium level scores suggest moderate symptoms of mental health issues. Individuals in this range may experience more persistent symptoms such as anxiety, depression, or difficulty coping with stressors, which may interfere with daily functioning to some extent.'
      }
    ]
  },
  {
    priority: Priority.High,
    messages: [
      {
        title: 'High Level Scores:',
        description: 'High level scores indicate severe or intense symptoms of mental health issues. Individuals with high scores may experience significant impairment in daily functioning, such as severe depression, anxiety attacks, psychosis, or suicidal thoughts, requiring urgent professional intervention and support.'
      }
    ]
  }
];
@Component({
  selector: 'app-patient-advices',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './patient-advices.component.html'
})
export class PatientAdvicesComponent implements OnInit {
  patient: ViewPatientProfile = {} as ViewPatientProfile;
  advices: Advice[] = [];
  filteredAdvices: Message[] = [];
  constructor(
    private patientService: PatientService,
    private authService: AuthenticationService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    const id = Number(this.authService.userId);
    this.getPatientDetails(id);
  }


  private getPatientDetails(id: number) {
    this.patientService.getById(id).subscribe({
      next: (response) => {
        this.patient = response.data;
        this.filteredAdvices = this.filterAdvicesByPriority(this.patient.priority);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError("An error occurred");
      },
    });
  }

  private filterAdvicesByPriority(priority: Priority): Message[] {
    const filteredAdvices = advicesArray
      .filter(advice => advice.priority === priority)
      .flatMap(advice => advice.messages);
    return filteredAdvices;
  }
}
