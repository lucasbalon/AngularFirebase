import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MATCH_PASSWORDS} from '../../validators/password.validator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly location: Location,
    private _snackBar: MatSnackBar
  ) {
    // Création du formulaire avec validation
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: MATCH_PASSWORDS });  // Validateur de correspondance de mots de passe
  }

  ngOnInit(): void {
    // Redirection si l'utilisateur est déjà connecté
    if (localStorage.getItem('token') != null) {
      this._router.navigate(['dashboard']);
    }
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      // Logique pour inscrire l'utilisateur, par exemple via un service
      const { email, password, name } = this.signUpForm.value;
      try {
        this._authService.signUp(email, password, name);
        // Rediriger l'utilisateur après l'inscription réussie
        this._router.navigate(['login']);
        this._snackBar.open('Utilisateur créé avec succès', 'Fermer', {
          duration: 6000, // Durée du message en millisecondes
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'] // Facultatif : ajoute une classe personnalisée pour le style
        });
      } catch (error) {
        this._snackBar.open('Une erreur est survenue. Essayez à nouveau.', 'Fermer', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-error'] // Facultatif : ajoute une classe personnalisée pour le style
        });
        console.error('Erreur d\'inscription:', error);
      }
    }
  }
  goBack() {
    this.location.back();
  }

}
