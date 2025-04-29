import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent, // Ruta predeterminada
        data: { titulo: 'Home', urltitulo: '/dashboard' }
      },
      {
        path: 'nopage',
        component: NopageFoundComponent // Ejemplo de otra ruta
      },
      { path: '**', redirectTo: 'nopage', pathMatch: 'full' } // Ruta para manejar rutas no encontradas
    ]
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
