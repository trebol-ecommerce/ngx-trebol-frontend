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
import { Image } from 'src/models/entities/Image';
import { ImageFormComponent } from './image-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-image-form formControlName="image"></app-image-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ImageFormComponent, { static: true }) imageFormComponent: ImageFormComponent;

  formGroup = new FormGroup({ image: new FormControl(null) });
  get image() { return this.formGroup.get('image') as FormControl; }
}

describe('ImageFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ImageFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        ImageFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.imageFormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(containerForm).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of Image as valid input', () => {
    const mockImage: Image = {
      filename: 'test.jpg',
      url: '/path/to/test.jpg',
      code: 'test-image'
    };
    containerForm.image.setValue(mockImage);
    expect(component.formGroup.value).toEqual(mockImage);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-Product-instances as invalid input', () => {
    const notAnImage = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.image.setValue(notAnImage);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});
