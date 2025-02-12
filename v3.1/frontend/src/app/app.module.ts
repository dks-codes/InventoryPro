import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { WidgetPropertiesComponent } from './components/widget-properties/widget-properties.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { CommonModule } from '@angular/common';
import { TextfieldComponent } from './components/widgets/textfield/textfield.component';
import { NumberfieldComponent } from './components/widgets/numberfield/numberfield.component';
import { RadioComponent } from './components/widgets/radio/radio.component';
import { ComboComponent } from './components/widgets/combo/combo.component';
import { BaseFieldComponent } from './components/widgets/base-field/base-field.component';

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
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
