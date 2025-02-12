import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-widget-properties',
  templateUrl: './widget-properties.component.html',
  styleUrls: ['./widget-properties.component.css']
})
export class WidgetPropertiesComponent implements OnInit {

  @Input() widget: any; // Take input from parent
  @Output() widgetChange = new EventEmitter<any>(); // Emit output to parent
  
  propertiesForm: FormGroup; // Will contain baseProperties & specificProperties

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  /* Widget Form Creation*/
  private createForm() {
    // form controls - name, text, description, mandatory
    const baseProperties = {
      name: [this.widget.name, Validators.required],
      text: [this.widget.text, Validators.required],
      description: [this.widget.description],
      mandatory: [this.widget.mandatory]
    };

    let specificProperties: { [key: string]: any } = {};

    switch (this.widget.widget) {
      case 'textfield':
        specificProperties = {
          maxLength: [this.widget.properties.maxLength],
          defaultValue: [this.widget.properties.defaultValue],
          disabled: [this.widget.disabled]
        };
        break;

      case 'numberfield':
        specificProperties = {
          min: [this.widget.properties.min],
          max: [this.widget.properties.max],
          defaultValue: [this.widget.properties.defaultValue]
        };
        break;

      case 'radio':
      case 'combo':
        specificProperties = {
          options: this.formBuilder.array((this.widget.properties.datasource || []).map((option: any) =>
                    this.formBuilder.group({
                      label: [option.label, Validators.required],
                      value: [option.value, Validators.required]
                  })
            )
          )
        };
        
        if (this.widget.widget === 'combo') {
          specificProperties['multiselect'] = [this.widget.properties.multiselect];
        }
        break;
    }

    this.propertiesForm = this.formBuilder.group({
      ...baseProperties,
      ...specificProperties
    });
  }

  /* Gets form-control "options" from Form-Group "propertiesForm" and returns a form-array */
  get optionsArray() {
    return this.propertiesForm.get('options') as FormArray; 
  }

  addOption() {
    const optionsFormArray = this.propertiesForm.get('options') as FormArray;
    optionsFormArray.push(
      this.formBuilder.group({
        label: ['', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeOption(index: number) {
    // Gets form-control "options" from Form-Group "propertiesForm" and returns it as form-array
    const optionsFormArray = this.propertiesForm.get('options') as FormArray; 
    optionsFormArray.removeAt(index);
  }


  onSubmitWidget() {
    if (this.propertiesForm.valid) {
      const updatedWidget = { ...this.widget }; // Shallow copy of widget from parent. This will be updated with new values
      const formValue = this.propertiesForm.value; // FormGroup has a lot of properties like value, controls, touched, validators, tec

      // Update common properties
      updatedWidget.name = formValue.name;
      updatedWidget.text = formValue.text;
      updatedWidget.description = formValue.description;
      updatedWidget.mandatory = formValue.mandatory;

      // Update widget-specific properties
      switch (updatedWidget.widget) {
        case 'textfield':
          updatedWidget.properties.maxLength = formValue.maxLength;
          updatedWidget.properties.defaultValue = formValue.defaultValue;
          updatedWidget.disabled = formValue.disabled;
          break;

        case 'numberfield':
          updatedWidget.properties.min = formValue.min;
          updatedWidget.properties.max = formValue.max;
          updatedWidget.properties.defaultValue = formValue.defaultValue;
          break;

        case 'radio':
        case 'combo':
          updatedWidget.properties.datasource = formValue.options;
          if (updatedWidget.widget === 'combo') {
            updatedWidget.properties.multiselect = formValue.multiselect;
          }
          break;
      }

      this.widgetChange.emit(updatedWidget);
    }
    else{
      console.log("Invalid form")
    }
  }
}
