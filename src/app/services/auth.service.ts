import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.userData = null;
        localStorage.removeItem('user');
      }
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user: User | null = userCredential.user;
      if (user && !user.emailVerified) {
        await signOut(this.auth);  // Déconnexion immédiate
        this._snackBar.open('Veuillez vérifier votre adresse e-mail avant de vous connecter.', 'Fermer', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-error'] // Facultatif : ajoute une classe personnalisée pour le style
        });
      }
      await this.router.navigate(['dashboard']);
    } catch (error: any) {
      //window.alert(error.message);
    }
  }


  // Méthode d'inscription
  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      // Création de l'utilisateur avec email et mot de passe
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Ajouter l'utilisateur à Firestore
      await this.checkAndAddUserToFirestore(userCredential.user.uid, name, email);

      // Envoi de l'email de vérification
      await sendEmailVerification(userCredential.user);

      await signOut(this.auth);
    } catch (error: any) {
      // Gérez l'erreur ici, par exemple afficher un message
      console.error('Erreur d\'inscription :', error.message);
    }
  }

  private async checkAndAddUserToFirestore(uid: string, name: string, email: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, { name, email, role: "worker", points: 100 });
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.removeItem('user');
      await this.router.navigate(['sign-in']);
    } catch (error: any) {
      console.error('Error signing out:', error);
    }
  }
  // Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return !!user /*&& user.emailVerified !== false*/;
  }

  // Reset password
  async passwordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      //window.alert('Password reset email sent, check your inbox.');
    } catch (error: any) {
      //window.alert(error.message);
    }
  }
}
