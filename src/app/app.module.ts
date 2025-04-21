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
import { ToastrModule } from 'ngx-toastr';
import { toastrConfig } from 'app-config';
//import { BreadcrumbModule } from 'angular2-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ModalSweetComponent,
    ConfirmModalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(toastrConfig),
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
