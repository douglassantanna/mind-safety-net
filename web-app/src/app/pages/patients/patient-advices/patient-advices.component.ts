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
        title: 'Example 1',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 2',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 3',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 4',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
    ]
  },
  {
    priority: Priority.Medium,
    messages: [
      {
        title: 'Example 1',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 2',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 3',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 4',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
    ]
  },
  {
    priority: Priority.High,
    messages: [
      {
        title: 'Example 1',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 2',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 3',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
      {
        title: 'Example 4',
        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      },
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
