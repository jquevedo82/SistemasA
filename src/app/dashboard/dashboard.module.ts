import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
//import { MatBreadcrumbModule } from 'angular2-breadcrumb'; // Asegúrate de instalar angular2-breadcrumb si lo usas

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
   // MatBreadcrumbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHomeComponent
  ]
})
export class DashboardModule { }
