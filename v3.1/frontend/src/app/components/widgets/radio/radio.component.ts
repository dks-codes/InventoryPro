import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFieldComponent } from '../base-field/base-field.component';
import { ValidationService } from 'src/app/services/validation/validation.service';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent extends BaseFieldComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(validationService: ValidationService) {
      super(validationService)
     }
  
  // get options() {
  //   return this.propertiesForm.get('options') as FormArray;
  // }

  // addOption() {
  //   this.options.push(new FormControl(''));
  // }

  // removeOption(index: number) {
  //   this.options.removeAt(index);
  // }

}
