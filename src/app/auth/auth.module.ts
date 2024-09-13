import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../material/material.module';
import { AuthGuard } from './auth.guard';
import { loginGuard } from './login.guard';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatCardModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent , canActivate: [loginGuard]}
    ])
  ],
})
export class AuthModule { }
