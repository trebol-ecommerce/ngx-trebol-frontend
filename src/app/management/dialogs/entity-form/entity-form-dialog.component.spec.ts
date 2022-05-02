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
  selector: 'app-shipper-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockShipperFormComponent }]
})
class MockShipperFormComponent extends MockAbstractForm { }

@Component({
  selector: 'app-user-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockUserFormComponent }]
})
class MockUserFormComponent extends MockAbstractForm { }


class EntityDescriptor {
  name: EntityTypeName;
  formComponentSelector: string;
}
const entityDescriptors: EntityDescriptor[] = [
  { name: 'address', formComponentSelector: 'app-address-form' },
  { name: 'image', formComponentSelector: 'app-image-form' },
  { name: 'person', formComponentSelector: 'app-person-form' },
  { name: 'product', formComponentSelector: 'app-product-form' },
  { name: 'productCategory', formComponentSelector: 'app-product-category-form' },
  { name: 'productList', formComponentSelector: 'app-product-list-form' },
  { name: 'shipper', formComponentSelector: 'app-shipper-form' },
  { name: 'user', formComponentSelector: 'app-user-form' }
];

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

  it('should close upon cancellation', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  describe('when no entity type is passed', () => {
    it('should throw an error', () => {
      expect(() => {
        fixture.detectChanges();
      }).toThrowError();
    });
  });

  entityDescriptors.forEach(eType => {
    describe(`when the '${eType.name}' entity type is passed`, () => {
      beforeEach(() => {
        mockDialogData.entityType = eType.name;
      });

      it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });

      it('should instantiate the appropiate form', () => {
        fixture.detectChanges();
        const formElem = fixture.debugElement.nativeElement.querySelector(eType.formComponentSelector);
        expect(formElem).toBeTruthy();
      });

      describe('without an initial value', () => {
        beforeEach(() => {
          mockDialogData.isNewItem = true;
          dataApiServiceSpy.create.and.returnValue(of(void 0));
          fixture.detectChanges();
        });

        it('should be invalid on creation', () => {
          expect(component.formGroup.invalid).toBeTrue();
        });

        it('should not submit for creation when the form is considered invalid', () => {
          component.onSubmit();
          expect(dataApiServiceSpy.create).not.toHaveBeenCalled();
        });

        it('should submit for creation when the form is considered valid', () => {
          component.item.setValue('some-value');
          expect(component.formGroup.valid).toBeTrue();
          component.onSubmit();
          expect(dataApiServiceSpy.create).toHaveBeenCalled();
        });
      });

      describe('with an initial value', () => {
        beforeEach(() => {
          mockDialogData.item = 'some-initial-value';
          fixture.detectChanges();
        });

        it('should load value on creation', () => {
          expect(component.item.value).toBe(mockDialogData.item);
        });


        describe('and the editing data is marked as new', () => {
          beforeEach(() => {
            dataApiServiceSpy.create.and.returnValue(of(void 0));
            mockDialogData.isNewItem = true;
          });

          it('should be able to submit and create it', () => {
            component.onSubmit();
            expect(dataApiServiceSpy.create).toHaveBeenCalled();
            expect(dataApiServiceSpy.update).not.toHaveBeenCalled();
          });
        });

        describe('and the editing data is marked as existent', () => {
          beforeEach(() => {
            dataApiServiceSpy.update.and.returnValue(of(void 0));
            mockDialogData.isNewItem = false;
          });

          it('should be able to submit and create it', () => {
            component.onSubmit();
            expect(dataApiServiceSpy.create).not.toHaveBeenCalled();
            expect(dataApiServiceSpy.update).toHaveBeenCalled();
          });
        });
      });
    });
  });


});
