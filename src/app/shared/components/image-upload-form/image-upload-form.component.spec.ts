/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ImageUploadFormComponent } from './image-upload-form.component';
import { ImageManagerUploadService } from './image-upload-form.service';

@Component({
  selector: 'app-file-upload',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockFileUploadComponent },
    { provide: MatFormFieldControl, multi: true, useExisting: MockFileUploadComponent }
  ]
})
class MockFileUploadComponent
  implements ControlValueAccessor, MatFormFieldControl<FileList> {
  stateChanges = of(void 0);
  required = false;
  disabled = false;
  shouldLabelFloat = false;
  focused = false;
  empty = true;
  errorState = false;
  value: FileList;
  id = '';
  placeholder = '';
  ngControl: NgControl;
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
  setDescribedByIds(ids: string[]): void { }
  onContainerClick(event: MouseEvent): void { }
}

describe('ImageUploadFormComponent', () => {
  let component: ImageUploadFormComponent;
  let fixture: ComponentFixture<ImageUploadFormComponent>;
  let mockService: Partial<ImageManagerUploadService>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialog: Partial<MatDialogRef<ImageUploadFormComponent>>;

  beforeEach(waitForAsync(() => {
    mockService = {
      submit() { return of(true); }
    };
    mockSnackBarService = {
      open() { return void 0; }
    };
    mockDialog = {
      close() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,
      ],
      declarations: [
        ImageUploadFormComponent,
        MockFileUploadComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: ImageManagerUploadService, useValue: mockService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
