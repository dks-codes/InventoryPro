import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    const group: { [key: string]: any } = {};
  
    this.formSchema.fields.forEach((field: any) => {
      const validators = []; // To psuh all validators to be applied on the input field
  
      if (field.mandatory) {
        validators.push(Validators.required);
      }
  
      switch (field.widget) {
        case 'textfield':
          if (field.properties.maxLength) {
            validators.push(Validators.maxLength(field.properties.maxLength));
          }
          group[field.name] = [field.properties.defaultValue || '', validators];
          break;
  
        case 'numberfield':
          validators.push(Validators.min(field.properties.min));
          validators.push(Validators.max(field.properties.max));
          group[field.name] = [field.properties.defaultValue || null, validators];
          break;
  
        case 'radio':
          group[field.name] = [field.properties.defaultValue || null, validators];
          break;
  
        case 'combo':
          if (field.properties.multiselect) {
            // Initialize as FormArray with default values if any
            const defaultValues = field.properties.defaultValue || [];
            // produces an array of FormControls
            const formControls = defaultValues.map((value: any) => this.formBuilder.control(value)); 
            group[field.name] = this.formBuilder.array(formControls, validators);
          } else {
            // Single select combo
            group[field.name] = [field.properties.defaultValue || null, validators];
          }
          break;
  
        default:
          group[field.name] = [field.properties.defaultValue || '', validators];
          break;
      }
    });
  
    this.formGroup = this.formBuilder.group(group);
  }


  onSubmit() {
    if (this.formGroup.valid) {
      this.submitting = true;
      
      const submissions = Object.entries(this.formGroup.value).map(([name, value]) => {
        const field = this.formSchema.fields.find(f => f.name === name);
        return { name, value };
      });
      
      const submission = {
        formId: this.formSchema.formId,
        formName: this.formSchema.formName,
        submissions
      };
      
      this.formService.submitFormData(submission)
        .subscribe(
          response => {
            console.log('Form submitted successfully', response);
            alert("Form submitted successfully");
          },
          error => {
            console.error('Form submission failed', error);
            alert("Form submission failed");
          }
        )
        .add(() => this.submitting = false);
    }
  }
}