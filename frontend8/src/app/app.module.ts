import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule,  } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AddModalComponent,
    FilterModalComponent,
    DeleteModalComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,

    MatTableModule,

    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,

    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Create this if you don't have one
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddModalComponent, FilterModalComponent, DeleteModalComponent]
})
export class AppModule { }
