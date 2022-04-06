/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { EntityTypeName } from 'src/models/EntityTypeNames';
import { EntityFormDialogComponent } from './entity-form-dialog.component';
import { EntityFormDialogData } from './EntityFormDialogData';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

class MockAbstractForm implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressFormComponent }]
})
class MockAddressFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-image-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockImageFormComponent }]
})
class MockImageFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-product-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductFormComponent }]
})
class MockProductFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-product-category-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductCategoryFormComponent }]
})
class MockProductCategoryFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-product-list-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductListFormComponent }]
})
class MockProductListFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-sell-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockSellFormComponent }]
})
class MockSellFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-shipper-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockShipperFormComponent }]
})
class MockShipperFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-user-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockUserFormComponent }]
})
class MockUserFormComponent extends MockAbstractForm { }

describe('EntityFormDialogComponent', () => {
  let component: EntityFormDialogComponent<any>;
  let fixture: ComponentFixture<EntityFormDialogComponent<any>>;
  let dataApiServiceSpy: jasmine.SpyObj<ITransactionalEntityDataApiService<any>>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EntityFormDialogComponent<any>>>;
  let snackBarServiceSpy: jasmine.SpyObj<MatSnackBar>;
  let mockDialogData: Partial<EntityFormDialogData<any>>;

  beforeEach(waitForAsync(() => {
    const mockDataApiService = jasmine.createSpyObj('ITransactionalEntityDataApiService<any>', ['create', 'update']);
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef<EntityFormDialogComponent<any>>', ['close']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockDialogData = {
      apiService: mockDataApiService
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        MockCenteredMatSpinnerComponent,
        MockAddressFormComponent,
        MockImageFormComponent,
        MockPersonFormComponent,
        MockProductFormComponent,
        MockProductCategoryFormComponent,
        MockProductListFormComponent,
        MockSellFormComponent,
        MockShipperFormComponent,
        MockUserFormComponent,
        EntityFormDialogComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataApiServiceSpy = TestBed.inject(MAT_DIALOG_DATA).apiService as jasmine.SpyObj<ITransactionalEntityDataApiService<any>>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EntityFormDialogComponent<any>>>;
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(EntityFormDialogComponent);
    component = fixture.componentInstance;
  });

  describe('when no entity type is passed', () => {
    it('should throw an error', () => {
      expect(() => {
        fixture.detectChanges();
      }).toThrow();
    });
  });


  // TODO the following suites could do with smarter refactoring
  describe('when an entity type is passed', () => {

    describe('without an initial value', () => {
      let shouldCreateForm: (entityType: EntityTypeName, selector?: string) => void;
      let shouldSubmitForCreation: () => void;

      beforeEach(() => {
        dataApiServiceSpy.create.and.returnValue(of(void 0));
        shouldCreateForm = (entityType: EntityTypeName, selector?: string) => {
          if (!selector) {
            selector = `app-${entityType}-form`;
          }
          mockDialogData.entityType = entityType;
          fixture.detectChanges();
          expect(component).toBeTruthy();
          const formElem = fixture.debugElement.nativeElement.querySelector(selector);
          expect(formElem).toBeTruthy();
        };
        shouldSubmitForCreation = () => {
          expect(component.formGroup.untouched).toBeTrue();
          expect(component.formGroup.invalid).toBeTrue();
          component.onSubmit();
          expect(dataApiServiceSpy.create).not.toHaveBeenCalled();

          component.item.setValue('some-value');
          expect(component.formGroup.valid).toBeTrue();
          component.onSubmit();
          expect(dataApiServiceSpy.create).toHaveBeenCalled();
        };
      });

      it('should create an Address form', () => {
        shouldCreateForm('address');
        shouldSubmitForCreation();
      });

      it('should create an Image form', () => {
        shouldCreateForm('image');
        shouldSubmitForCreation();
      });

      it('should create a Person form', () => {
        shouldCreateForm('person');
        shouldSubmitForCreation();
      });

      it('should create a Product form', () => {
        shouldCreateForm('product');
        shouldSubmitForCreation();
      });

      it('should create a ProductCategory form', () => {
        shouldCreateForm('productCategory', 'app-product-category-form');
        shouldSubmitForCreation();
      });

      it('should create a ProductList form', () => {
        shouldCreateForm('productList', 'app-product-list-form');
        shouldSubmitForCreation();
      });

      it('should create a Sell form', () => {
        shouldCreateForm('sell');
        shouldSubmitForCreation();
      });

      it('should create a Shipper form', () => {
        shouldCreateForm('shipper');
        shouldSubmitForCreation();
      });

      it('should create a User form', () => {
        shouldCreateForm('user');
        shouldSubmitForCreation();
      });
    });

    describe('with an initial value', () => {
      let createSubmittableForm: (entityType: EntityTypeName) => void;
      let shouldSubmitForUpdate: () => void;

      beforeEach(() => {
        dataApiServiceSpy.update.and.returnValue(of(void 0));
        createSubmittableForm = (entityType: EntityTypeName) => {
          dataApiServiceSpy.create
          mockDialogData.entityType = entityType;
          mockDialogData.item = 'somevalue';
          fixture.detectChanges();
          expect(component).toBeTruthy();
        };
        shouldSubmitForUpdate = () => {
          expect(component.formGroup.valid).toBeTrue();
          component.onSubmit();
          expect(dataApiServiceSpy.create).not.toHaveBeenCalled();
          expect(dataApiServiceSpy.update).toHaveBeenCalled();
        };
      });

      it('should create an Address form', () => {
        createSubmittableForm('address');
        shouldSubmitForUpdate();
      });

      it('should create an Image form', () => {
        createSubmittableForm('image');
        shouldSubmitForUpdate();
      });

      it('should create a Person form', () => {
        createSubmittableForm('person');
        shouldSubmitForUpdate();
      });

      it('should create a Product form', () => {
        createSubmittableForm('product');
        shouldSubmitForUpdate();
      });

      it('should create a ProductCategory form', () => {
        createSubmittableForm('productCategory');
        shouldSubmitForUpdate();
      });

      it('should create a ProductList form', () => {
        createSubmittableForm('productList');
        shouldSubmitForUpdate();
      });

      it('should create a Sell form', () => {
        createSubmittableForm('sell');
        shouldSubmitForUpdate();
      });

      it('should create a Shipper form', () => {
        createSubmittableForm('shipper');
        shouldSubmitForUpdate();
      });

      it('should create a User form', () => {
        createSubmittableForm('user');
        shouldSubmitForUpdate();
      });
    });

  });

  describe('always', () => {
    beforeEach(() => {
      try {
        fixture.detectChanges();
      } catch (err) { }
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should close upon cancellation', () => {
      component.onCancel();
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });
  });

});
