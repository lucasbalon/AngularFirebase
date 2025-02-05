import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | null = null;

  constructor(
    private auth: Auth, // Inject Firebase Auth from the new modular API
  ) {
    // Subscribe to auth state changes
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

  // Sign in with email/password
  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  // Sign up with email/password
  async signUp(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendVerificationMail(userCredential.user);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  // Send email verification
  async sendVerificationMail(user: User): Promise<void> {
    try {
      await sendEmailVerification(user);
    } catch (error: any) {
      console.error('Error sending verification email:', error);
    }
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

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.removeItem('user');
    } catch (error: any) {
      console.error('Error signing out:', error);
    }
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return !!user /*&& user.emailVerified !== false*/;
  }
}
