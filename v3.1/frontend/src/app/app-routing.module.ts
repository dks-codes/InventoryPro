import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormViewComponent } from './components/form-view/form-view.component';


const routes: Routes = [
  { path: 'list-form', component: FormListComponent},
  { path: 'form-builder', component: FormBuilderComponent},
  { path: 'form-builder/:formId', component: FormBuilderComponent},
  { path: 'form-view/:formId', component: FormViewComponent},
  { path: '', redirectTo: '/list-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/list-form', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
