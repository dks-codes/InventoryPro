import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-base-field',
  templateUrl: './base-field.component.html',
  styleUrls: ['./base-field.component.css'],
})
export class BaseFieldComponent implements OnInit {
  ngOnInit() {
  }

  @Input() formGroup: FormGroup;
  @Input() field: any;

  constructor(protected validationService: ValidationService) {}

  isFieldInvalid(fieldName: string): boolean {
    const control = this.formGroup.get(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(): string {
    return this.validationService.getErrorMessage(
      this.formGroup.get(this.field.name),
      this.field
    );
  }

}
