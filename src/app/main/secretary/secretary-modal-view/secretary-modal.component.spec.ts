import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryModalComponent } from './secretary-modal.component';

describe('SecretaryModalComponent', () => {
  let component: SecretaryModalComponent;
  let fixture: ComponentFixture<SecretaryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
