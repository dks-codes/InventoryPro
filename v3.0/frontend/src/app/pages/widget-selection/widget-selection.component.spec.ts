import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSelectionComponent } from './widget-selection.component';

describe('WidgetSelectionComponent', () => {
  let component: WidgetSelectionComponent;
  let fixture: ComponentFixture<WidgetSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
