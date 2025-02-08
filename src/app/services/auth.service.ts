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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
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
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.router.navigate(['dashboard']);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.checkAndAddUserToFirestore(userCredential.user.uid, name, email);
      await sendEmailVerification(userCredential.user);
      await this.router.navigate(['verify-email-address']);
    } catch (error: any) {
      window.alert(error.message);
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
      window.alert('Password reset email sent, check your inbox.');
    } catch (error: any) {
      window.alert(error.message);
    }
  }
}
