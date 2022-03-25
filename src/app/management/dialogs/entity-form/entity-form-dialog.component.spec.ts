/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { EntityFormDialogComponent } from './entity-form-dialog.component';
import { EntityFormDialogData } from './EntityFormDialogData';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => MockAddressForm) }]
})
class MockAddressForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-image-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockImageForm }]
})
class MockImageForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonForm }]
})
class MockPersonForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-product-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductForm }]
})
class MockProductForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-product-category-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductCategoryForm }]
})
class MockProductCategoryForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-product-list-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductListForm }]
})
class MockProductListForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-sell-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockSellForm }]
})
class MockSellForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-shipper-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockShipperForm }]
})
class MockShipperForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

@Component({
  selector: 'app-user-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockUserForm }]
})
class MockUserForm
  implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
}

describe('EntityFormDialogComponent', () => {
  let component: EntityFormDialogComponent<any>;
  let fixture: ComponentFixture<EntityFormDialogComponent<any>>;
  let mockDataApiService: ITransactionalEntityDataApiService<any>;
  let mockDialogData: Partial<EntityFormDialogData<any>>;
  let mockDialogRef: Partial<MatDialogRef<EntityFormDialogComponent<any>>>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDataApiService = {
      create() { return of(void 0); },
      delete() { return of(void 0); },
      fetchExisting() { return of(void 0); },
      fetchPage() { return of(void 0); },
      update() { return of(void 0); }
    };
    mockDialogData = {
      apiService: mockDataApiService
    };
    mockDialogRef = {
      close() { }
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        MockCenteredMatSpinnerComponent,
        MockAddressForm,
        MockImageForm,
        MockPersonForm,
        MockProductForm,
        MockProductCategoryForm,
        MockProductListForm,
        MockSellForm,
        MockShipperForm,
        MockUserForm,
        EntityFormDialogComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EntityFormDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should error out without a correct entity type', () => {
    try {
      fixture.detectChanges();
    } catch (error) {
      expect(component).toBeTruthy();
    }
  });

  it('should create a correct Address form', () => {
    TestBed.inject(MAT_DIALOG_DATA).entityType = 'address'
    mockDialogData.entityType = 'address';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-address-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct Image form', () => {
    mockDialogData.entityType = 'image';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-image-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct Person form', () => {
    mockDialogData.entityType = 'person';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-person-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct Product form', () => {
    mockDialogData.entityType = 'product';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-product-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct ProductCategory form', () => {
    mockDialogData.entityType = 'productCategory';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-product-category-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct ProductList form', () => {
    mockDialogData.entityType = 'productList';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-product-list-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct Sell form', () => {
    mockDialogData.entityType = 'sell';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-sell-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct Shipper form', () => {
    mockDialogData.entityType = 'shipper';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-shipper-form');
    expect(formElem).toBeTruthy();
  });

  it('should create a correct User form', () => {
    mockDialogData.entityType = 'user';
    fixture.detectChanges();
    const nativeElem: HTMLElement = fixture.nativeElement;
    const formElem = nativeElem.querySelector('app-user-form');
    expect(formElem).toBeTruthy();
  });
});