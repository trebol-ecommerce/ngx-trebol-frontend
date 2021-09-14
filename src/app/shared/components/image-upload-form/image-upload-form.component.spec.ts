/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { ImageUploadFormComponent } from './image-upload-form.component';
import { ImageManagerUploadService } from './image-upload-form.service';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';

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
        FormsModule,
        ReactiveFormsModule,
        LocalMemoryApiModule
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
