import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkSheetComponent } from './mark-sheet.component';

describe('MarkSheetComponent', () => {
  let component: MarkSheetComponent;
  let fixture: ComponentFixture<MarkSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
