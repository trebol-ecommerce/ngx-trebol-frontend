// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { CenteredMatProgressSpinnerComponent } from 'src/app/shared/components/centered-mat-spinner/centered-mat-spinner.component';
import { FormGroupOwnerOutletDirective } from 'src/app/shared/directives/form-group-owner-outlet/form-group-owner-outlet.directive';
import { DataManagerFormDialogComponent } from './data-manager-form-dialog.component';
import { DataManagerFormDialogData } from './DataManagerFormDialogData';

@Component({
  selector: 'app-mock-form-group-owner',
  template: '<form [formGroup]="formGroup"><input type="text" formControlName="test" /></form>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MockFormGroupOwnerComponent
    }
  ]
})
class MockFormGroupOwnerComponent
  implements ControlValueAccessor, FormGroupOwner {
  formGroup = new FormGroup({ test: new FormControl('') });
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
  onParentFormTouched() { }
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
      formComponent: MockFormGroupOwnerComponent
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
        MatDialogModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        MockFormGroupOwnerComponent,
        CenteredMatProgressSpinnerComponent,
        FormGroupOwnerOutletDirective,
        DataManagerFormDialogComponent
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
    expect(component.formGroupOutlet).toBeTruthy();
  });
});
