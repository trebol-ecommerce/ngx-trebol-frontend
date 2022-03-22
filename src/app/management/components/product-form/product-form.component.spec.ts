/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Image } from 'src/models/entities/Image';
import { Product } from 'src/models/entities/Product';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'app-slideshow',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockSlideshowComponent }]
})
class MockSlideshowComponent
  implements ControlValueAccessor {
  @Input() images: any[];
  @Input() autocycle: boolean;
  @Input() editable: boolean;
  @Output() add = new EventEmitter();
  writeValue(obj: any): void { this.images = obj; }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-product-category-selector-form-field',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockCategorySelectorFormFieldComponent }]
})
class MockCategorySelectorFormFieldComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { };
  ontouched = () => { };
  writeValue() { }
  registerOnChange(fn: (v: any) => any) { this.onchange = fn; }
  registerOnTouched(fn: () => any) { this.ontouched = fn; }
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockDialogService = {
      open() {
        return {
          afterClosed() { return of(void 0); }
        } as MatDialogRef<any>;
      }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        ProductFormComponent,
        MockSlideshowComponent,
        MockCategorySelectorFormFieldComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should accept instances of Product as valid input', () => {
    const mockProduct: Product = {
      barcode: 'test-barcode',
      name: 'test',
      category: null,
      price: 1000,
      images: [],
      description: ''
    };
    component.writeValue(mockProduct);
    expect(component.formGroup.value).toEqual(mockProduct);
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should fail to take non-Product instance objects', () => {
    const notAProduct = {
      foo: 'example',
      bar: 'test'
    };
    try {
      component.writeValue(notAProduct);
    } catch (err) {
      expect(err).toBeTruthy();
    }
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should open a dialog to select images to add', () => {
    const dialogOpenSpy = spyOn(mockDialogService, 'open').and.callThrough();
    component.onClickAddImage();
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should push images from the image selection dialog into the form', () => {
    expect(component.images.value).toEqual([]);
    const mockImagesArray: Image[] = [{ filename: 'test.jpg', url: '/path/to/test.jpg' }];
    mockDialogService.open = () => ({
      afterClosed() {
        return of(mockImagesArray);
      }
    } as MatDialogRef<any>);
    component.onClickAddImage();
    expect(component.images.value).toEqual(mockImagesArray);
  });
});
