import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-numberfield',
  templateUrl: './numberfield.component.html',
  styleUrls: ['./numberfield.component.css']
})
export class NumberfieldComponent extends BaseFieldComponent {

  ngOnInit() {
  }

  constructor(validationService: ValidationService) {
    super(validationService)
   }

}
