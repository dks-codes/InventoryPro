import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { TableComponent } from './shared/components/table/table.component';




@NgModule({
  declarations: [HeaderComponent, TableComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, TableComponent]
})
export class SharedModule { }
