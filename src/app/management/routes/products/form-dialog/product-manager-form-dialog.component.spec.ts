// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProductManagerFormDialogComponent } from './product-manager-form-dialog.component';
import { ProductManagerFormService } from './product-manager-form.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

describe('ProductManagerFormDialogComponent', () => {
  let component: ProductManagerFormDialogComponent;
  let fixture: ComponentFixture<ProductManagerFormDialogComponent>;
  let mockService: Partial<ProductManagerFormService>;
  let mockDialogRef: Partial<MatDialogRef<ProductManagerFormDialogComponent>>;

  beforeEach(waitForAsync(() => {
    mockService = {
      saving$: of(false),
      categories$: of([]),
      getAllRootProductCategories() { return of([]); },
      updateSelectedCategory(i) {},
      submit(i) { return of(true); }
    };
    mockDialogRef = {
      close() { }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [ ProductManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: ProductManagerFormService, useValue: mockService },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
