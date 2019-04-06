import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyGradeModalComponent } from './reply-grade-modal.component';

describe('ReplyGradeModalComponent', () => {
  let component: ReplyGradeModalComponent;
  let fixture: ComponentFixture<ReplyGradeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyGradeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyGradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
