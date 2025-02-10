import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css']
})
export class RadioFieldComponent implements OnInit {

  @Input() field: any;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
