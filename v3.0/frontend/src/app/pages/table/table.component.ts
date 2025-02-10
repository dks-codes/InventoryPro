import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];

  displayedColumns : string[] = ['name', 'text', 'description', 'mandatory'];

  constructor() { }

  ngOnInit() {
  }

}
