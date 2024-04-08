import { Component, OnInit } from '@angular/core';
import { PatientService, ViewPatientProfile } from '../../../core/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

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
  advices: any[] = [
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
  ];
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('id', id);

      this.patientService.getById(id).subscribe({
        next: (response) => {
          this.patient = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      })
    });
  }

}
