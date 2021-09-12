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
import { ImageManagerUploadDialogComponent } from './image-manager-upload-dialog.component';
import { ImageManagerUploadService } from './image-manager-upload.service';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/data.local-memory-api.module';

describe('ImageManagerUploadDialogComponent', () => {
  let component: ImageManagerUploadDialogComponent;
  let fixture: ComponentFixture<ImageManagerUploadDialogComponent>;
  let mockService: Partial<ImageManagerUploadService>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialog: Partial<MatDialogRef<ImageManagerUploadDialogComponent>>;

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
        LocalMemoryDataModule
      ],
      declarations: [
        ImageManagerUploadDialogComponent,
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
    fixture = TestBed.createComponent(ImageManagerUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
