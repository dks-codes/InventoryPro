import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-widget-selection',
  templateUrl: './widget-selection.component.html',
  styleUrls: ['./widget-selection.component.css']
})
export class WidgetSelectionComponent implements OnInit {

  ngOnInit() {
  }


  selectedWidget: string = '';
  widgetConfig: any = null;
  formWidgets: any[] = [];
  formData: any = {}; // To hold form data

  constructor(private http: HttpClient) {}

  // Load schema when widget is selected
  onWidgetChange() {
    if (!this.selectedWidget) return;
    this.loadSchema(this.selectedWidget);
  }

  // Fetch schema from JSON
  loadSchema(widgetType: string) {
    this.http.get(`/assets/schemas/${widgetType}.json`).subscribe(
      (data) => {
        this.widgetConfig = { ...data };
      },
      (error) => {
        console.error(`Error loading ${widgetType}.json`, error);
      }
    );
  }

  // Add the configured widget to the form
  addWidgetToForm() {
    if (this.widgetConfig) {
      this.formWidgets.push({ ...this.widgetConfig });
      this.widgetConfig = null;
      this.selectedWidget = '';
    }
  }

  // Handle datasource input change
  updateDatasource(value: string) {
    this.widgetConfig.properties.datasource = value.split(',').map((item) => item.trim());
  }


  // Save the form data to the backend
  submitForm() {
    // Loop through formWidgets and extract user input data
    this.formWidgets.forEach(widget => {
      if (widget.widget === 'textfield' || widget.widget === 'numberfield') {
        this.formData[widget.name] = widget.value; // Collecting text input and number input values
      } else if (widget.widget === 'radio') {
        this.formData[widget.name] = widget.value; // Collecting radio button selected value
      } else if (widget.widget === 'combo') {
        this.formData[widget.name] = widget.value; // Collecting selected option in combo box
      }
    });

    // Send data to backend (assuming /api/save endpoint is set up on your backend)
    this.http.post('/api/save', this.formData).subscribe(
      (response) => {
        console.log('Form saved successfully', response);
      },
      (error) => {
        console.error('Error saving form', error);
      }
    );
  }
}
