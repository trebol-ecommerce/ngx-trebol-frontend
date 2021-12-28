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
import { ProductListContentsDialogComponent } from './product-list-contents-dialog.component';
import { ProductListContentsDialogService } from './product-list-contents-dialog.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent {
  @Output() filtersChanges = new EventEmitter();
}

describe('ProductListContentsDialogComponent', () => {
  let component: ProductListContentsDialogComponent;
  let fixture: ComponentFixture<ProductListContentsDialogComponent>;
  let productsArrayService: Partial<ProductListContentsDialogService>;

  beforeEach(waitForAsync(() => {
    productsArrayService = {
      page$: of({
        items: [],
        totalCount: 0,
        pageIndex: 0,
        pageSize: 10
      }),
      loading$: of(false),
      reloadItems() {}
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
      ],
      declarations: [
        ProductListContentsDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockProductFiltersPanelComponent
      ],
      providers: [
        { provide: ProductListContentsDialogService, useValue: productsArrayService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListContentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
