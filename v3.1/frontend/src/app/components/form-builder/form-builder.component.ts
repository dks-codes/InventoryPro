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

  widgetTemplates: any[] = [];
  formFields: any[] = [];
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
        if (Array.isArray(templates)) {
          this.widgetTemplates = templates;
        } else {
          console.error("Unexpected response:", templates);
          this.widgetTemplates = [];
        }
      },(error) => console.error("Error fetching templates:", error));
  }


  loadForm(formId: string) {
    this.formBuilderService.getFormById(formId)
      .subscribe(form => {
        this.formFields = form.fields || [];
      }, error => console.error("Error loading form:", error));
  }


  addWidget(template: any) {
    this.formFields.push({ ...template });
    console.log(this.formFields);
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveField(index: number, updatedWidget: any) {
    this.formFields[index] = updatedWidget;
    console.log(updatedWidget);
    console.log(this.formFields);
  }

  // saveForm() {
  //   const formSchema = {
  //     fields: this.formFields
  //   };
    
  //   this.formBuilderService.saveFormSchema(formSchema)
  //     .subscribe(response => {
  //       console.log('Form saved successfully', response);
  //       alert("Form saved successfully");
  //       // Handle success (e.g., redirect to form view)
  //       this.router.navigate(['/form-view', response.formId]);
  //     },
  //   (error) => {
  //     console.error("Error saving form:", error); 
  //   });
  // }

  saveForm() {
    const formSchema = {
      formId: this.formId, // Include formId for updates
      fields: this.formFields
    };

    this.formBuilderService.saveFormSchema(formSchema)
      .subscribe(response => {
        console.log('Form saved successfully', response);
        alert("Form saved successfully");
        this.router.navigate(['/form-view', response.formId]);
      }, error => console.error("Error saving form:", error));
  }

}
