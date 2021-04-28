/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { ImagesArrayDialogComponent } from './images-array-dialog.component';
import { ImagesArrayService } from './images-array.service';

describe('StoreImagesPickerDialogComponent', () => {
  let component: ImagesArrayDialogComponent;
  let fixture: ComponentFixture<ImagesArrayDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<ImagesArrayDialogComponent>>;
  let mockImagesArrayService: Partial<ImagesArrayService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close() {}
    };
    mockImagesArrayService = {
      imageList$: of(void 0),
      filter: ''
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule
      ],
      declarations: [ ImagesArrayDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: StoreService, useValue: mockImagesArrayService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
