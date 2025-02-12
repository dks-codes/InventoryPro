import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getWidgetTemplates(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/widgets`);
  }

  // saveFormSchema(formSchema: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/forms`, formSchema);
  // }

  saveFormSchema(formSchema: any): Observable<any> {
    if (formSchema.formId) {
      // If formId exists, update the existing form
      return this.http.put(`${this.apiUrl}/forms/update-form/${formSchema.formId}`, formSchema);
    } else {
      // Otherwise, create a new form
      return this.http.post(`${this.apiUrl}/forms/create-form`, formSchema);
    }
  }
  

  getFormById(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms/get-form/${formId}`);
  }

  deleteFormById(formId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/forms/delete-form/${formId}`);
  }

  submitFormData(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/form-submissions`, formData);
  }

  getAllForms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all-forms`);
  }
}
