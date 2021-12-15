/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductCategoriesDataApiService } from 'src/app/api/product-categories.data-api.iservice';
import { ImageFormComponent } from './image-form.component';

@Component({ selector: 'app-slideshow' })
class MockSlideshowComponent {
  @Input() images: any[];
  @Input() autocycle: boolean;
  @Input() editable: boolean;
  @Output() add = new EventEmitter();
}

describe('ImageFormComponent', () => {
  let component: ImageFormComponent;
  let fixture: ComponentFixture<ImageFormComponent>;
  let mockCategoriesDataApiService: Partial<IProductCategoriesDataApiService>;
  let mockDialogRef: Partial<MatDialogRef<ImageFormComponent>>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockCategoriesDataApiService = {
      readAllProductCategories() {
        return of([]);
      }
    };
    mockDialogRef = {
      close() { }
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [
        ImageFormComponent,
        MockSlideshowComponent
      ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockCategoriesDataApiService },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
