/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductsArrayDialogComponent } from './products-array-dialog.component';
import { ProductsArrayService } from './products-array.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

describe('ProductsArrayDialogComponent', () => {
  let component: ProductsArrayDialogComponent;
  let fixture: ComponentFixture<ProductsArrayDialogComponent>;
  let productsArrayService: Partial<ProductsArrayService>;

  beforeEach(waitForAsync(() => {
    productsArrayService = {
      filteredProductsArray$: of([]),
      productsArray$: of([]),
      loading$: of(false),
      changeFiltersTo(f) {},
      includeProduct(p) {},
      dropProductByIndex(i) {}
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatExpansionModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        ProductsArrayDialogComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: ProductsArrayService, useValue: productsArrayService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
