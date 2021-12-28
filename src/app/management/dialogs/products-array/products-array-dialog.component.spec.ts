/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent {
  @Output() filtersChanges = new EventEmitter();
}

describe('ProductsArrayDialogComponent', () => {
  let component: ProductsArrayDialogComponent;
  let fixture: ComponentFixture<ProductsArrayDialogComponent>;
  let mockService: Partial<ProductsArrayService>;

  beforeEach(waitForAsync(() => {
    mockService = {
      filteredProductsArray$: of([]),
      productsArray$: of([]),
      loading$: of(false),
      changeFiltersTo(f) {},
      includeProduct(p) {},
      dropProductByIndex(i) {}
    };

    TestBed.overrideComponent(
      ProductsArrayDialogComponent,
      {
        set: {
          providers: [{ provide: ProductsArrayService, useValue: mockService }]
        }
      }
    )

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule
      ],
      declarations: [
        ProductsArrayDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockProductFiltersPanelComponent
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
