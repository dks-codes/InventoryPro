import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css']
})
export class NumberFieldComponent implements OnInit {

  @Input() field: any;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
