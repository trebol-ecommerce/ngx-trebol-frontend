/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { Image } from 'src/models/entities/Image';
import { ImageFormComponent } from './image-form.component';

describe('ImageFormComponent', () => {
  let component: ImageFormComponent;
  let fixture: ComponentFixture<ImageFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ ImageFormComponent ],
      providers: [
        EntityFormGroupFactoryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should accept instances of Image as valid input', () => {
    const mockImage: Image = {
      filename: 'test.jpg',
      url: '/path/to/test.jpg',
      code: 'test-image'
    };
    component.writeValue(mockImage);
    expect(component.formGroup.value).toEqual(mockImage);
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should fail to take non-Product instance objects', () => {
    const notAnImage = {
      foo: 'example',
      bar: 'test'
    };
    try {
      component.writeValue(notAnImage);
    } catch (err) {
      expect(err).toBeTruthy();
    }
    component.formGroup.updateValueAndValidity();
    expect(component.formGroup.valid).toBeFalsy();
  });
});
