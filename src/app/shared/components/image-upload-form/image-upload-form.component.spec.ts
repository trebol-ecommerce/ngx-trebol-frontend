/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { ImageUploadFormComponent } from './image-upload-form.component';
import { ImageManagerUploadService } from './image-upload-form.service';

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
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,
      ],
      declarations: [
        ImageUploadFormComponent,
        FileUploadComponent
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
