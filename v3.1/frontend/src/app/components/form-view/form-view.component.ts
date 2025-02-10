import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBuilderService } from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  formSchema: any;
  formGroup: FormGroup;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formService: FormBuilderService
  ) {}

  ngOnInit() {
    const formId = this.route.snapshot.params['formId'];
    this.loadForm(formId);
  }

  private loadForm(formId: string) {
    this.formService.getFormById(formId).subscribe(schema => {
      console.log("Received schema:", schema);
      this.formSchema = schema;
      this.createFormGroup();
    });
  }

  private createFormGroup() {
    const group: { [key: string]: any } = {};  // key wil be string and can be anything like display, text, value, etc
    
    this.formSchema.fields.forEach((field: any) => {
      console.log(field);
      const validators = [];
      
      if (field.mandatory) {
        validators.push(Validators.required);
      }
      
      switch (field.widget) {
        case 'textfield':
          if (field.properties.maxLength) {
            validators.push(Validators.maxLength(field.properties.maxLength));
          }
          break;
          
        case 'numberfield':
          validators.push(Validators.min(field.properties.min));
          validators.push(Validators.max(field.properties.max));
          break;
      }
      
      group[field.name] = [field.properties.defaultValue || '', validators];
    });
    
    this.formGroup = this.formBuilder.group(group);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.formGroup.get(fieldName);
    return control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: any): string {
    const control = this.formGroup.get(field.name);
    
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

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitting = true;
      
      const submission = {
        formId: this.formSchema.formId,
        submissions: Object.entries(this.formGroup.value).map(([name, value]) => ({
          name,
          value
        }))
      };
      
      this.formService.submitFormData(submission)
        .subscribe(
          response => {
            console.log('Form submitted successfully', response);
            alert("Form submitted successfully");
            // Handle success (e.g., show success message, redirect)
          },
          error => {
            console.error('Form submission failed', error);
            // Handle error
          }
        )
        .add(() => this.submitting = false);
    }
  }

}
