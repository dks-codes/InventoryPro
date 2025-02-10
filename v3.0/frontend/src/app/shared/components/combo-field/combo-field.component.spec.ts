import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboFieldComponent } from './combo-field.component';

describe('ComboFieldComponent', () => {
  let component: ComboFieldComponent;
  let fixture: ComponentFixture<ComboFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
