import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface DynamicField {
  _id?: string;
  fieldName: string;
  displayName: string;
  fieldType: 'textfield' | 'numberfield' | 'radio' | 'combo' | 'fileupload' | 'date' | 'email' | 'checkbox' | 'phonenumber';
  entity: 'user' | 'inventory';
  isGlobal?: boolean;
  configuration?: {
    maxLength?: number;
    minLength?: number;
    defaultValue?: any;
    required?: boolean;
    disabled?: boolean;
    isHidden?: boolean;
    multiselect?: boolean;
    options?: { label: string; value: any }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class DynamicFieldService {
  private apiUrl = `${environment.apiUrl}/dynamic-fields`;

  constructor(private http: HttpClient) {}

  addField(field: DynamicField): Observable<DynamicField> {
    return this.http.post<DynamicField>(`${this.apiUrl}/add`, field);
  }

  getDynamicFields(entity: 'user' | 'inventory'): Observable<DynamicField[]> {
    return this.http.get<DynamicField[]>(`${this.apiUrl}/get-dynamic-fields/${entity}`);
  }

  getFormFields(entity: 'user' | 'inventory'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/form-fields/${entity}`);
  }

  updateField(id: string, field: Partial<DynamicField>): Observable<DynamicField> {
    return this.http.put<DynamicField>(`${this.apiUrl}/update-field/${id}`, field);
  }

  deleteField(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete-field/${id}`);
  }

  addOption(fieldId: string, label: string, value: any): Observable<DynamicField> {
    return this.http.post<DynamicField>(`${this.apiUrl}/add-option`, { fieldId, label, value });
  }

  updateOption(fieldId: string, optionId: string, newLabel: string, newValue: any): Observable<DynamicField> {
    return this.http.put<DynamicField>(`${this.apiUrl}/update-option`, { fieldId, optionId, newLabel, newValue });
  }

  deleteOption(fieldId: string, optionId: string): Observable<DynamicField> {
    return this.http.delete<DynamicField>(`${this.apiUrl}/delete-option`, { 
      params: { fieldId, optionId },
      responseType: 'json'
      });
  }
}