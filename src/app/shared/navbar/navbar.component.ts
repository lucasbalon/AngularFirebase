import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  // Vérifie si l'utilisateur est connecté
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.authService.signOut().then(() => {
      // Redirection après déconnexion (vers la page de login par exemple)
      window.location.href = '/login';
    });
  }
}
