import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';



export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        // component: HomeComponent
        loadComponent: () => { return import('./pages/home/home.component').then(m => m.HomeComponent) }
    },
    {
        path: 'item/edit/:id',
        // component: EditItemComponent
        loadComponent: () => { return import('./pages/edit-item/edit-item.component').then(m => m.EditItemComponent) }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
  ];