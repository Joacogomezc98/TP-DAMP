import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dispositivo/:deviceId',
    loadComponent: () => import('./dispositivo/dispositivo.page').then(m => m.DispositivoPage)
  },
  {
    path: 'mediciones/:deviceId',
    loadComponent: () => import('./mediciones/mediciones.page').then(m => m.MedicionesPage)
  },
  {
    path: 'logs/:electrovalvulaId',
    loadComponent: () => import('./logs/logs.page').then(m => m.LogsPage)
  }
];
