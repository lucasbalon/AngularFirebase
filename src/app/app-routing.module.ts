import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UploadComponent} from './components/upload/upload.component';
import {AuthGuard} from '@angular/fire/auth-guard';
import {LoginComponent} from './components/login/login.component';
import {CreateProductComponent} from './components/create-product/create-product.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]  },
  { path: 'create', component: CreateProductComponent, canActivate: [AuthGuard]  },
  //{ path: '**', component: PageNotFoundComponent } // Route pour les pages non trouvées (404)
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
