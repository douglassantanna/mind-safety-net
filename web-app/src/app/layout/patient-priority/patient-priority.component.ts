import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Priority } from '../../core/models/patients';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-priority',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="['priority', getClasses()]">
      {{ priorityString }}
    </div>
  `,
  styles: [`
  .priority {
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    width: 150px;
  }

  .low {
    background-color: #7cb342;
  }

  .medium {
    background-color: #0096C7;
  }

  .high {
    background-color: #e57373;
  }

  .undefined {
    background-color: #9e9e9e;
  }
  `]
})
export class PatientPriorityComponent implements OnChanges {
  @Input() priority: Priority = Priority.Undefined;
  priorityString: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('priority' in changes) {
      this.priorityString = this.getPriorityString(changes['priority'].currentValue);
    }
  }

  getPriorityString(priority: Priority): string {
    console.log(priority);

    switch (priority) {
      case Priority.Low:
        return 'Low';
      case Priority.Medium:
        return 'Medium';
      case Priority.High:
        return 'High';
      default:
        return 'Undefined';
    }
  }
  getClasses(): string {
    let classes = 'priority';
    switch (this.priority) {
      case Priority.Low:
        classes += ' low';
        break;
      case Priority.Medium:
        classes += ' medium';
        break;
      case Priority.High:
        classes += ' high';
        break;
      default:
        classes += ' undefined';
    }
    return classes;
  }
}
