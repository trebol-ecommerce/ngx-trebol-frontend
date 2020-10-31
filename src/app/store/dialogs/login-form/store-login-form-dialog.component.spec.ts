// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreLoginFormDialogComponent } from './store-login-form-dialog.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

describe('StoreLoginFormDialogComponent', () => {
  let component: StoreLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreLoginFormDialogComponent>;
  let dialog: Partial<MatDialogRef<StoreLoginFormDialogComponent>>;
  let appService: Partial<AppService>;
  let snackBar: Partial<MatSnackBar>;

  beforeEach(async(() => {
    dialog = {
      close() {}
    };
    appService = {
      login() { return of(true); }
    };
    snackBar = {
      open() { return undefined; }
    };
    spyOn(appService, 'login').and.callThrough();
    spyOn(dialog, 'close');

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        RouterTestingModule
      ],
      declarations: [ StoreLoginFormDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialog },
        { provide: AppService, useValue: appService },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit incomplete form', () => {
    component.onSubmit();
    component.username.setValue('test');
    component.onSubmit();
    component.formGroup.reset();
    component.password.setValue('test');
    component.onSubmit();
    expect(appService.login).not.toHaveBeenCalled();
  });

  it('should submit correct form', () => {
    component.username.setValue('test');
    component.password.setValue('pass');
    component.onSubmit();
    expect(appService.login).toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    component.onCancel();
    expect(dialog.close).toHaveBeenCalled();
  });
});
