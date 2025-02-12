import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  getErrorMessage(control: AbstractControl, field: any): string {
    if (!control) return '';

    if (control.hasError('required')) {
      return `${field.text} is required`;
    }

    if (control.hasError('maxlength')) {
      return `${field.text} cannot be longer than ${field.properties.maxLength} characters`;
    }

    if (control.hasError('min')) {
      return `${field.text} must be at least ${field.properties.min}`;
    }

    if (control.hasError('max')) {
      return `${field.text} must be at most ${field.properties.max}`;
    }

    return '';
  }
}
