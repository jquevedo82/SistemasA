import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MaterialModule } from './material/material.module';
import { ModalComponent } from './shared/modal/modal.component';
import { ModalSweetComponent } from './shared/modal-sweet/modal-sweet.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ToastrModule } from 'ngx-toastr';
import { PersonalComponent } from './pages/personal/personal.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
//import { BreadcrumbModule } from 'angular2-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ModalSweetComponent,
    ConfirmModalComponent,
    PersonalComponent,
    ClientesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DashboardModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Cambia la posición aquí
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
