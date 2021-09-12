// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UserManagerFormDialogComponent } from './user-manager-form-dialog.component';
import { UserManagerFormService } from './user-manager-form.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserManagerFormDialogComponent', () => {
  let component: UserManagerFormDialogComponent;
  let fixture: ComponentFixture<UserManagerFormDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<UserManagerFormDialogComponent>>;
  let mockService: Partial<UserManagerFormService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close(v?: any) { }
    };
    mockService = {
      saving$: of(false),
      getPeople() { return of([]); },
      getUserRoles() { return of([]); }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [ UserManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: UserManagerFormService, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
