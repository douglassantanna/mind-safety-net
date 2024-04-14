import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-helping-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helping-center.component.html'
})
export class HelpingCenterComponent {
  helpingCenters = [{
    name: 'Dublin City Volunteer Centre',
    location: 'Unit 4 Whitefriars, Aungier Street, Dublin 2',
    email: 'info@volunteerdublincity.ie',
    phoneNumber: '01 473 7482'
  },
  {
    name: 'Cork Volunteer Centre',
    location: '13 North Main Street, Cork',
    email: 'info@volunteercork.ie',
    phoneNumber: '021 425 1575'
  },
  {
    name: 'Galway Volunteer Centre',
    location: 'Courthouse Square, Galway',
    email: 'info@volunteergalway.ie',
    phoneNumber: '091 581727'
  },
  {
    name: 'Limerick Volunteer Centre',
    location: '58 O’Connell Street, Limerick',
    email: 'info@volunteerlimerick.ie',
    phoneNumber: '061 262 278'
  },
  {
    name: 'Waterford Volunteer Centre',
    location: 'Unit 5F, OConnell Street Business Centre, OConnell Street, Waterford',
    email: 'info@volunteerwaterford.ie',
    phoneNumber: '051 844 155'
  }];
}
