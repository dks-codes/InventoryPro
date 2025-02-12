import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent extends BaseFieldComponent {

  ngOnInit(): void {
  }
  
  // @Input() field: any;
  // @Input() formGroup: FormGroup;


  constructor(validationService: ValidationService) {
    super(validationService)
   }

}
