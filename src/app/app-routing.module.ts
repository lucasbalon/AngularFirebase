import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent }, // Route par défaut (Accueil)
  { path: 'login', component: AuthComponent }, // Route vers "À propos"
  //{ path: '**', component: PageNotFoundComponent } // Route pour les pages non trouvées (404)
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
