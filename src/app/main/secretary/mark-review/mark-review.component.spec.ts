import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkReviewComponent } from './mark-review.component';

describe('MarkReviewComponent', () => {
  let component: MarkReviewComponent;
  let fixture: ComponentFixture<MarkReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
