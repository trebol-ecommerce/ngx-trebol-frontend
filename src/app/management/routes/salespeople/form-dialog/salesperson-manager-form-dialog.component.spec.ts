// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SalespersonManagerFormDialogComponent } from './salesperson-manager-form-dialog.component';
import { SalespersonManagerFormService } from './salesperson-manager-form.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';

describe('SalespersonManagerFormDialogComponent', () => {
  let component: SalespersonManagerFormDialogComponent;
  let fixture: ComponentFixture<SalespersonManagerFormDialogComponent>;
  let mockService: Partial<SalespersonManagerFormService>;
  let mockDialogRef: Partial<MatDialogRef<SalespersonManagerFormDialogComponent>>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockService = {
      submit() { return of(true); }
    };
    mockDialogRef = {
      close(v?: any) {}
    };
    mockSnackBarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [
        SalespersonManagerFormDialogComponent,
        PersonFormComponent
      ],
      providers: [
        { provide: SalespersonManagerFormService, useValue: mockService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
