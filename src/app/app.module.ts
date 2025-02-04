import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Nouvelle API modulaire Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { firebaseConfig } from '../environments/environment.development';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {MatAnchor, MatButton, MatButtonModule} from '@angular/material/button';
import { UploadComponent } from './components/upload/upload.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FirebaseAuthInterceptor} from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Autres modules
    FormsModule,
    MatToolbar,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatAnchor,
    MatButton,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbar,
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: FirebaseAuthInterceptor, multi: true },
    // Nouvelle API Firebase modulaire
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // Firestore
    provideStorage(() => getStorage()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
