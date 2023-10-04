/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock/mock-products.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { Image } from 'src/models/entities/Image';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-form formControlName="product"></app-product-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductFormComponent, { static: true }) productFormComponent: ProductFormComponent;

  formGroup = new UntypedFormGroup({ product: new UntypedFormControl(null) });
  get product() { return this.formGroup.get('product') as UntypedFormControl; }
}

const mockProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];

@Component({
  selector: 'app-slideshow',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockSlideshowComponent }]
})
class MockSlideshowComponent
  implements ControlValueAccessor {
  @Input() images: any[];
  @Input() automaticSlide: boolean;
  @Input() editable: boolean;
  @Output() add = new EventEmitter();
  writeValue(obj: any): void { this.images = obj; }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-product-category-selector-field',
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
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ProductFormComponent;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        MockSlideshowComponent,
        MockCategorySelectorFormFieldComponent,
        ProductFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService },
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.productFormComponent;
  });

  describe('before its first change', () => {
    it('should create', () => {
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

    it('should persist', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should not a have valid form state at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.valid).toBeFalsy();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.product.value).not.toEqual(mockProduct);
      component.barcode.setValue(mockProduct.barcode);
      component.name.setValue(mockProduct.name);
      component.price.setValue(mockProduct.price);
      component.description.setValue(mockProduct.description);
      component.images.setValue(mockProduct.images);
      component.category.setValue(mockProduct.category);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.product.value).toEqual(mockProduct);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.product.value).not.toEqual(mockProduct);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.product.setValue(mockProduct);
      expect(component.barcode.value).toEqual(mockProduct.barcode);
      expect(component.name.value).toEqual(mockProduct.name);
      expect(component.price.value).toEqual(mockProduct.price);
      expect(component.description.value).toEqual(mockProduct.description);
      expect(component.images.value).toEqual(mockProduct.images);
      expect(component.category.value).toEqual(mockProduct.category);
      containerForm.product.setValue(null);
      expect(component.barcode.value).toBeFalsy();
      expect(component.name.value).toBeFalsy();
      expect(component.price.value).toBeFalsy();
      expect(component.description.value).toBeFalsy();
      expect(component.images.value).toEqual([]);
      expect(component.category.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Product as valid input', () => {
      containerForm.product.setValue(mockProduct);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Product-instances as invalid input', () => {
      const notAProduct = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.product.setValue(notAProduct);
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should open a dialog to select images to add', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of(void 0)
      } as MatDialogRef<any>);
      component.onClickAddImage();
      expect(dialogServiceSpy.open).toHaveBeenCalled();
    });

    it('should push images from the image selection dialog into the form', () => {
      const mockImagesArray: Image[] = [{ filename: 'test.jpg', url: '/path/to/test.jpg' }];
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of(mockImagesArray)
      } as MatDialogRef<any>);

      expect(component.images.value).toEqual([]);
      component.onClickAddImage();
      expect(component.images.value).toEqual(mockImagesArray);
    });
  });
});
