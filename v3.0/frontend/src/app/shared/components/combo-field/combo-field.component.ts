import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-combo-field',
  templateUrl: './combo-field.component.html',
  styleUrls: ['./combo-field.component.css']
})
export class ComboFieldComponent implements OnInit {

  @Input() field: any;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
