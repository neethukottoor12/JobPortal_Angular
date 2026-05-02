import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './routes/authorization-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SignUpComponent,
    ConfirmPasswordComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthorizationModule { }
