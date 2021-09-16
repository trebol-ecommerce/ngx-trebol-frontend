import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGroupOwnerOutletDirective } from './form-group-owner-outlet.directive';

describe('FormGroupOwnerOutletDirective', () => {
  let component: FormGroupOwnerOutletDirective;
  let fixture: ComponentFixture<FormGroupOwnerOutletDirective>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupOwnerOutletDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupOwnerOutletDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
