/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { Shipper } from 'src/models/entities/Shipper';
import { ShipperFormComponent } from './shipper-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-shipper-form formControlName="shipper"></app-shipper-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ShipperFormComponent, { static: true }) shipperFormComponent: ShipperFormComponent;

  formGroup = new FormGroup({ shipper: new FormControl(null) });
  get shipper() { return this.formGroup.get('shipper') as FormControl; }
}

describe('ShipperFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ShipperFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        ShipperFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [ EntityFormGroupFactoryService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.shipperFormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of Shipper as valid input', () => {
    const mockShipper: Shipper = {
      name: 'some-name'
    };
    containerForm.shipper.setValue(mockShipper);
    expect(component.formGroup.value).toEqual(mockShipper);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-Shipper-instances as invalid input', () => {
    const notAShipper = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.shipper.setValue(notAShipper);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});
