import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';




@NgModule({
  declarations: [HomeComponent, DashboardComponent, NotFoundComponent, AuthComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent, DashboardComponent, NotFoundComponent]
})
export class PagesModule { }
