/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ImagesArrayDialogComponent } from './images-array-dialog.component';
import { ImagesArrayService } from './images-array.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

describe('ImagesArrayDialogComponent', () => {
  let component: ImagesArrayDialogComponent;
  let fixture: ComponentFixture<ImagesArrayDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<ImagesArrayDialogComponent>>;
  let mockService: Partial<ImagesArrayService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close() {}
    };
    mockService = {
      loading$: of(false),
      imagesPage$: of({
        items: [ ],
        pageIndex: 0,
        pageSize: 10,
        totalCount: 0
      }),
      filter: '',
      reloadItems() { }
    };

    TestBed.overrideComponent(
      ImagesArrayDialogComponent,
      {
        set: {
          providers: [{ provide: ImagesArrayService, useValue: mockService }]
        }
      }
    );
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule
      ],
      declarations: [
        ImagesArrayDialogComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef }
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
