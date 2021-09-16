import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroupOwnerOutletDirective } from './form-group-owner-outlet.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

// TODO add some components to test the directive

describe('FormGroupOwnerOutletDirective', () => {
  let component: FormGroupOwnerOutletDirective;
  let fixture: ComponentFixture<FormGroupOwnerOutletDirective>;
  let mockComponentFactoryResolver: Partial<ComponentFactoryResolver>;
  let mockViewContainerRef: Partial<ViewContainerRef>;

  beforeEach(waitForAsync( () => {
    mockComponentFactoryResolver = {
      resolveComponentFactory() { return void 0; }
    };
    mockViewContainerRef = {
      createComponent() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [ FormGroupOwnerOutletDirective ],
      providers: [
        { provide: ComponentFactoryResolver, useValue: mockComponentFactoryResolver },
        { provide: ViewContainerRef, useValue: mockViewContainerRef }
      ]
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
