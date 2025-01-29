import { Component } from '@angular/core';
import {FirestoreService} from '../../services/firestore.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  name: string = "";
  color: any;
  age: any;

  constructor(public firestoreService: FirestoreService) { }

  addRobot(name: string, color: string, age: string) {
    this.firestoreService.createRobot(name, color, age);
  }
}
