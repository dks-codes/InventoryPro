import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderService } from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  providers: [TitleCasePipe]
})
export class FormBuilderComponent implements OnInit {

  widgetTemplates: any[] = []; // Array to store widget templates
  formFields: any[] = []; // Array to store form fields (Basically, stores different widgets of form)
  formId: string | null = null;

  constructor(private formBuilderService: FormBuilderService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadWidgetTemplates();
    
    // Check if editing an existing form
    this.route.paramMap.subscribe(params => {
      this.formId = params.get('formId');
      if (this.formId) {
        this.loadForm(this.formId);
      }
    });
  }

  loadWidgetTemplates() {
    this.formBuilderService.getWidgetTemplates()
      .subscribe((templates) => {
        console.log("Received templates:", templates);
          this.widgetTemplates = templates;
      },(error) => console.error("Error fetching templates:", error));
  }


  loadForm(formId: string) {
    this.formBuilderService.getFormById(formId)
      .subscribe(form => {
        this.formFields = form.fields || [];
      }, error => console.error("Error loading form:", error));
  }


  /* Adds widget to Form */
  addWidget(widget: any) {
    this.formFields.push({ ...widget }); // Shallow copy of widget added to formFields
    console.log(this.formFields);
  }

  /* Removes widget from Form */
  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveField(index: number, updatedWidget: any) {
    this.formFields[index] = updatedWidget;
    alert("Widget saved successfully");
    console.log(this.formFields);
  }


  saveForm() {
    const formSchema = {
      formId: this.formId, // Include formId for updates
      fields: this.formFields
    };

    this.formBuilderService.saveFormSchema(formSchema)
      .subscribe((response) => {
        console.log('Form saved successfully', response);
        alert("Form saved successfully");
        if (!this.formId) {
          this.formId = response.formId; // Set formId after creating a new form
          // console.log("Form ID:", this.formId);
        }
        this.router.navigate(['/form-view', this.formId]);
      }, error => console.error("Error saving form:", error));
  }

}
