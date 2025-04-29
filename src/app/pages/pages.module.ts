import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../dashboard/header/header.component';
import { FooterComponent } from '../dashboard/footer/footer.component';
import { SidebarComponent } from '../dashboard/sidebar/sidebar.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [ PagesComponent,
    HomeComponent,
    NopageFoundComponent],
  imports: [
    CommonModule, DashboardModule,
    RouterModule,
    MaterialModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class PagesModule { }
