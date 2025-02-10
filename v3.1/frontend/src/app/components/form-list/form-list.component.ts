import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilderService } from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css'],
  providers: [DatePipe]
})
export class FormListComponent implements OnInit {

  forms: any[] = [];

  constructor(
    private formService: FormBuilderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.formService.getAllForms().subscribe(
      forms => this.forms = forms,
      error => console.error('Error loading forms:', error)
    );
  }

  createNewForm() {
    this.router.navigate(['/form-builder']);
  }

  viewForm(formId: string) {
    this.router.navigate(['/form-builder', formId]);
  }

  deleteForm(formId: string){
    this.formService.deleteFormById(formId).subscribe(
      () => {
        // Remove the deleted form from the UI
        this.forms = this.forms.filter(form => form.formId !== formId);
        alert('Form deleted successfully');
      },
      (error) => {
        console.error('Error deleting form:', error);
      }
    )
  }

  fillForm(formId: string) {
    this.router.navigate(['/form-view', formId]);
  }
}
