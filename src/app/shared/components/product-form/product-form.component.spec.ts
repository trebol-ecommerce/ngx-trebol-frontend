/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockCategoriesApiService: Partial<ICategoriesPublicApiService>;
  let mockDialogRef: Partial<MatDialogRef<ProductFormComponent>>;

  beforeEach(waitForAsync(() => {
    mockCategoriesApiService = {
      fetchRootProductCategories() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
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
      declarations: [ ProductFormComponent ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.categories, useValue: mockCategoriesApiService },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
