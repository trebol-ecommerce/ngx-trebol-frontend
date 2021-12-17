/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProductCategorySelectorFormFieldComponent } from './product-category-selector-form-field.component';

describe('ProductCategorySelectorFormFieldComponent', () => {
  let component: ProductCategorySelectorFormFieldComponent;
  let fixture: ComponentFixture<ProductCategorySelectorFormFieldComponent>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialogService = {
      open() {
        return {
          afterClosed() { return of(void 0); }
        } as MatDialogRef<any>;
      }
    };

    TestBed.configureTestingModule({
      declarations: [ProductCategorySelectorFormFieldComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySelectorFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
