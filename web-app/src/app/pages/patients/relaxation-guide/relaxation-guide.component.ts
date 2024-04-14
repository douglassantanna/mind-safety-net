import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-relaxation-guide',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './relaxation-guide.component.html'
})
export class RelaxationGuideComponent {
  relaxationGuides = [
    {
      title: "Deep Breathing",
      videoUrl: "https://youtu.be/0Ni00XDSd6E?feature=shared",
      description: "Deep breathing, also known as diaphragmatic breathing or belly breathing, involves taking slow, deep breaths to promote relaxation and reduce stress. This technique focuses on breathing deeply from the diaphragm rather than shallowly from the chest. Deep breathing can help calm the nervous system, lower blood pressure, and reduce anxiety."
    },
    {
      title: "Muscle Relaxation",
      videoUrl: "https://youtu.be/0Ni00XDSd6E?feature=shared",
      description: "Progressive muscle relaxation (PMR) is a technique that involves tensing and then relaxing different muscle groups in the body. By systematically tensing and releasing muscle tension, PMR helps to relieve physical and mental tension, reduce muscle stiffness, and promote overall relaxation. This technique is often used to alleviate stress, improve sleep quality, and manage chronic pain."
    },
    {
      title: "Visualization",
      videoUrl: "https://youtu.be/0Ni00XDSd6E?feature=shared",
      description: "Visualization, also known as guided imagery or mental imagery, involves imagining calming and peaceful scenes or experiences in vivid detail. By visualizing serene landscapes, soothing environments, or positive outcomes, individuals can evoke feelings of relaxation, reduce anxiety, and enhance overall well-being. Visualization is often used in conjunction with other relaxation techniques such as deep breathing or progressive muscle relaxation."
    },
    {
      title: "Meditation",
      videoUrl: "https://youtu.be/0Ni00XDSd6E?feature=shared",
      description: "Meditation encompasses a variety of practices that focus on training the mind to achieve a state of deep relaxation and heightened awareness. Meditation techniques may involve mindfulness, concentration, or visualization to cultivate a sense of inner peace, clarity, and emotional balance. Regular meditation practice has been associated with numerous benefits, including stress reduction, improved focus, enhanced self-awareness, and increased feelings of calm and happiness."
    },
  ];
}
