import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validation pour l'email
      password: ['', [Validators.required, Validators.minLength(6)]] // Validation pour le mot de passe
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this._router.navigate(['dashboard']);
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this._authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this._router.navigate(['dashboard']);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.loading = false;
        });
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      this.loading = false;
    }
  }

  navigateToSignUp(): void {
    this._router.navigate(['sign-up']);
  }

  resetPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this._authService.passwordReset(email);
    }
  }
}
