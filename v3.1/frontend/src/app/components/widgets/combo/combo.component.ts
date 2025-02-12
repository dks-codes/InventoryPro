import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFieldComponent } from '../base-field/base-field.component';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent extends BaseFieldComponent implements OnInit {

  ngOnInit(): void {
  }
  
  constructor(private fb:FormBuilder, validationService: ValidationService) {
    super(validationService)
  }



  // isOptionSelected(fieldName: string, optionValue: string): boolean {
  //   const control = this.formGroup.get(fieldName);

  //   if (control instanceof FormArray) {
  //     return control.value.includes(optionValue); // Check if the option is selected
  //   }

  //   return control.value === optionValue;
  // }

  // onMultiSelectChange(fieldName: string, event: Event) {
  //   const control = this.formGroup.get(fieldName);
  
  //   if (control instanceof FormArray) {
  //     const formArray = control as FormArray;
  //     const selectElement = event.target as HTMLSelectElement;
  //     const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value);
  
  //     // Clear FormArray before adding selected values
  //     while (formArray.length) {
  //       formArray.removeAt(0);
  //     }
  
  //     // Add newly selected values
  //     selectedValues.forEach(value => formArray.push(this.fb.control(value)));
  //   }
  // }


  dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

  onCheckboxChange(fieldName: string, value: string) {
    const control = this.formGroup.get(fieldName);
    if (control instanceof FormArray) {
      const formArray = control as FormArray;
      const index = formArray.value.indexOf(value);
  
      if (index > -1) {
        formArray.removeAt(index); // Remove if already selected
      } else {
        formArray.push(this.fb.control(value)); // Add if not selected
      }
    }
  }

  isOptionSelected(fieldName: string, value: string): boolean {
    const control = this.formGroup.get(fieldName);
    return control instanceof FormArray && control.value.includes(value);
  }
  
  // Get selected options for display
  getSelectedOptions(fieldName: string): any[] {
    const control = this.formGroup.get(fieldName);
    if (control instanceof FormArray) {
      return control.value.map((val: any) => {
        return this.field.properties.datasource.find((option: any) => option.value === val);
      }).filter(Boolean); // Remove any undefined values
    }
    return [];
  }
  
  // Remove a selected option (when user clicks '×')
  removeSelectedOption(fieldName: string, value: string) {
    const control = this.formGroup.get(fieldName);
    if (control instanceof FormArray) {
      const formArray = control as FormArray;
      const index = formArray.value.indexOf(value);
      if (index > -1) {
        formArray.removeAt(index);
      }
    }
  }
  
  
  
}
