/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductCategorySelectorFieldComponent } from './product-category-selector-field.component';

describe('ProductCategorySelectorFormFieldComponent', () => {
  let component: ProductCategorySelectorFieldComponent;
  let fixture: ComponentFixture<ProductCategorySelectorFieldComponent>;
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
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [ProductCategorySelectorFieldComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
