import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';  // Firebase Authentication module from AngularFire
import { getIdToken } from 'firebase/auth';  // Firebase SDK function to get the ID token

@Injectable()
export class FirebaseAuthInterceptor implements HttpInterceptor {

  constructor(private auth: Auth) {}  // Inject Firebase Auth service

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.getToken()).pipe(  // Get the ID token as an observable
      switchMap(token => {
        // If there's a token, we clone the request and add the Authorization header
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`  // Attach the token to the request headers
            }
          });
        }
        // Continue with the request, whether the token is added or not
        return next.handle(req);
      })
    );
  }

  // Function to fetch the ID token asynchronously
  private async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;  // Access the currently authenticated user
    // If a user is authenticated, return their ID token; otherwise, return null
    return user ? await getIdToken(user) : null;
  }
}
