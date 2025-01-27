import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: string = "";
  password: string = "";

  constructor(
    public authService: AuthService
  ) {}

  SignIn() {
    this.authService.SignIn(this.email, this.password);
  }
}
