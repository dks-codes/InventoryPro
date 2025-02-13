import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { WidgetPropertiesComponent } from './components/widget-properties/widget-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { CommonModule } from '@angular/common';
import { TextfieldComponent } from './components/widgets/textfield/textfield.component';
import { NumberfieldComponent } from './components/widgets/numberfield/numberfield.component';
import { RadioComponent } from './components/widgets/radio/radio.component';
import { ComboComponent } from './components/widgets/combo/combo.component';
import { BaseFieldComponent } from './components/widgets/base-field/base-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormViewComponent,
    WidgetPropertiesComponent,
    FormBuilderComponent,
    TextfieldComponent,
    NumberfieldComponent,
    RadioComponent,
    ComboComponent,
    BaseFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatIconModule,
    MatButtonModule,
    
    DragDropModule,


    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,

    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
