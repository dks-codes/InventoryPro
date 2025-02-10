import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextFieldComponent } from './shared/components/text-field/text-field.component';
import { NumberFieldComponent } from './shared/components/number-field/number-field.component';
import { RadioFieldComponent } from './shared/components/radio-field/radio-field.component';
import { ComboFieldComponent } from './shared/components/combo-field/combo-field.component';
import { WidgetSelectionComponent } from './pages/widget-selection/widget-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule } from '@angular/material';
import { TableComponent } from './pages/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TextFieldComponent,
    NumberFieldComponent,
    RadioFieldComponent,
    ComboFieldComponent,
    WidgetSelectionComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
