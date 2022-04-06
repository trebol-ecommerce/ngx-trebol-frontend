/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressFormComponent }]
})
class MockAddressFormComponent { }

@Component({
  selector: 'app-image-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockImageFormComponent }]
})
class MockImageFormComponent { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent { }

@Component({
  selector: 'app-product-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductFormComponent }]
})
class MockProductFormComponent { }

@Component({
  selector: 'app-product-category-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductCategoryFormComponent }]
})
class MockProductCategoryFormComponent { }

@Component({
  selector: 'app-product-list-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductListFormComponent }]
})
class MockProductListFormComponent { }

@Component({
  selector: 'app-sell-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockSellFormComponent }]
})
class MockSellFormComponent { }

@Component({
  selector: 'app-shipper-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockShipperFormComponent }]
})
class MockShipperFormComponent { }

@Component({
  selector: 'app-user-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockUserFormComponent }]
})
class MockUserFormComponent { }

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
    dataApiServiceSpy = TestBed.inject(MAT_DIALOG_DATA) as jasmine.SpyObj<ITransactionalEntityDataApiService<any>>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EntityFormDialogComponent<any>>>;
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(EntityFormDialogComponent);
    component = fixture.componentInstance;
  });

  it('should error out if no entity type is passed', () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrow();
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
    })
  });

  describe('when an entity type is passed', () => {
    let shouldCreateForm: (entityType: EntityTypeName, selector?: string) => void;

    beforeEach(() => {
      shouldCreateForm = (entityType: EntityTypeName, selector?: string) => {
        if (!selector) {
          selector = `app-${entityType}-form`;
        }
        mockDialogData.entityType = entityType;
        fixture.detectChanges();
        expect(component.innerFormGroup).toBeTruthy();
        const formElem = fixture.debugElement.nativeElement.querySelector(selector);
        expect(formElem).toBeTruthy();
      };
    });

    it('should be able to create an Address form', () => {
      shouldCreateForm('address');
    });

    it('should be able to create an Image form', () => {
      shouldCreateForm('image');
    });

    it('should be able to create a Person form', () => {
      shouldCreateForm('person');
    });

    it('should be able to create a Product form', () => {
      shouldCreateForm('product');
    });

    it('should be able to create a ProductCategory form', () => {
      shouldCreateForm('productCategory', 'app-product-category-form');
    });

    it('should be able to create a ProductList form', () => {
      shouldCreateForm('productList', 'app-product-list-form');
    });

    it('should be able to create a Sell form', () => {
      shouldCreateForm('sell');
    });

    it('should be able to create a Shipper form', () => {
      shouldCreateForm('shipper');
    });

    it('should be able to create a User form', () => {
      shouldCreateForm('user');
    });
  });
});
