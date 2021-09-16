// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, NG_VALUE_ACCESSOR, NgControl, ControlValueAccessor } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { DataManagerFormDialogComponent } from './data-manager-form-dialog.component';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Directive, Type, Input, Component } from '@angular/core';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mock-form',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MockFormComponent
    }
  ]
})
class MockFormComponent implements ControlValueAccessor, FormGroupOwner {
  formGroup = new FormGroup({ test: new FormControl() });
  writeValue() { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
  onParentFormTouched() { }
}

@Directive({
  selector: '[appFormGroupOwnerOutlet]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MockFormGroupOwnerOutletDirective
    }
  ]
})
class MockFormGroupOwnerOutletDirective extends NgControl {
  @Input() componentType: Type<any>;
  innerComponent = new MockFormComponent();
  control = this.innerComponent.formGroup;
  valueAccessor = this.innerComponent;
  viewToModelUpdate() { }
}

describe('DataManagerFormDialogComponent', () => {
  let component: DataManagerFormDialogComponent<any>;
  let fixture: ComponentFixture<DataManagerFormDialogComponent<any>>;
  let mockDataApiService: ITransactionalEntityDataApiService<any>;
  let mockDialogData: Partial<DataManagerFormDialogData<any>>;
  let mockDialogRef: Partial<MatDialogRef<DataManagerFormDialogComponent<any>>>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDataApiService = {
      create() { return of(void 0); },
      delete() { return of(void 0); },
      fetchExisting() { return of(void 0); },
      fetchPage() { return of(void 0); },
      fetchPageFilteredBy() { return of(void 0); },
      update() { return of(void 0); }
    };
    mockDialogData = {
      item: { test: 'a' },
      service: mockDataApiService,
      formComponent: MockFormComponent
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
        ReactiveFormsModule,
        AngularMaterialModule
      ],
      declarations: [
        DataManagerFormDialogComponent,
        MockFormComponent,
        MockFormGroupOwnerOutletDirective
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
