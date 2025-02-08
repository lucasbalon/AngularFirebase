import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: false,

  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  loginForm: FormGroup;

  constructor(
    private readonly location: Location,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validation pour l'email
    });
  }

  goBack() {
    this.location.back();
  }


  resetPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this._authService.passwordReset(email).then(() => {
        // Afficher un message de confirmation avec MatSnackBar
        this._snackBar.open('Email de réinitialisation envoyé avec succès.', 'Fermer', {
          duration: 6000, // Durée du message en millisecondes
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'] // Facultatif : ajoute une classe personnalisée pour le style
        });
      }).catch((error) => {
        this._snackBar.open('Une erreur est survenue. Essayez à nouveau.', 'Fermer', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-error'] // Facultatif : ajoute une classe personnalisée pour le style
        });
      });
    }
  }
}
