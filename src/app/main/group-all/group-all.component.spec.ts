import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAllComponent } from './group-all.component';

describe('GroupAllComponent', () => {
  let component: GroupAllComponent;
  let fixture: ComponentFixture<GroupAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
