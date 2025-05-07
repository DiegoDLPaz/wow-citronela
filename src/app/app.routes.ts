import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/dashboard/pages/home/home.component';
import {CitronelaPageComponent} from './pages/dashboard/pages/citronela-page/citronela-page.component';
import {CallbackComponent} from './pages/dashboard/pages/callback/callback.component';
import {MisPersonajesPageComponent} from './pages/dashboard/pages/mis-personajes-page/mis-personajes-page.component';
import {LostVikingsPageComponent} from './pages/dashboard/pages/lost-vikings-page/lost-vikings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent
      },
      {
        path: 'citronela',
        title: 'Citronela',
        component: CitronelaPageComponent
      },
      {
        path: 'mis-personajes',
        title: 'Mis Personajes',
        component: MisPersonajesPageComponent
      },
      {
        path: 'lost-vikings',
        title: 'Lost Vikings',
        component: LostVikingsPageComponent
      },
      {
        path: 'callback',
        title: 'Callback',
        component: CallbackComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
