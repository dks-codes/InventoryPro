import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetSelectionComponent } from './pages/widget-selection/widget-selection.component';
import { TableComponent } from './pages/table/table.component';


const routes: Routes = [
  {path: 'widget-selection', component: WidgetSelectionComponent},
  {path: 'table', component: TableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
