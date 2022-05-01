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
import { MOCK_IMAGES } from 'src/app/api/local-memory/mock/mock-images.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
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

const mockImage = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];

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
  });

  describe('before its first change', () => {
    it('should create', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should have a safe ControlValueAccesor stub implementation', () => {
      expect(() => {
        component.onChange(null);
        component.onTouched();
        component.writeValue(null);
        component.setDisabledState(false);
      }).not.toThrowError();
    });

    it('should have a safe Validator stub implementation', () => {
      expect(() => {
        component.onValidatorChange();
        component.validate(null);
      }).not.toThrowError();
    });
  });

  describe('after its first change', () => {
    beforeEach(() => {
      fixture.detectChanges();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should not be valid at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.image.value).not.toEqual(mockImage);
      component.code.setValue(mockImage.code);
      component.filename.setValue(mockImage.filename);
      component.url.setValue(mockImage.url);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.image.value).toEqual(mockImage);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.image.value).not.toEqual(mockImage);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.image.setValue(mockImage);
      expect(component.code.value).toEqual(mockImage.code);
      expect(component.filename.value).toEqual(mockImage.filename);
      expect(component.url.value).toEqual(mockImage.url);
      containerForm.image.setValue(null);
      expect(component.code.value).toBeFalsy();
      expect(component.filename.value).toBeFalsy();
      expect(component.url.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.image.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.image.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Image as valid input', () => {
      containerForm.image.setValue(mockImage);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Image-instances as invalid input', () => {
      const notAnImage = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.image.setValue(notAnImage);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});
