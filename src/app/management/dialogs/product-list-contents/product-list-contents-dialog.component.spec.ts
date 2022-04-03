/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductList } from 'src/models/entities/ProductList';
import { ProductListContentsDialogComponent } from './product-list-contents-dialog.component';
import { ProductListContentsDialogService } from './product-list-contents-dialog.service';
import { ProductListContentsDialogData } from './ProductListContentsDialogData';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

describe('ProductListContentsDialogComponent', () => {
  let component: ProductListContentsDialogComponent;
  let fixture: ComponentFixture<ProductListContentsDialogComponent>;
  let mockDialogData: Partial<ProductListContentsDialogData>;
  let mockService: Partial<ProductListContentsDialogService>;

  beforeEach(waitForAsync(() => {
    mockDialogData = {
      list: new ProductList()
    };
    mockService = {
      page$: of({
        items: [],
        totalCount: 0,
        pageIndex: 0,
        pageSize: 10
      }),
      loading$: of(false),
      reloadItems() {}
    };

    TestBed.overrideComponent(
      ProductListContentsDialogComponent,
      {
        set: {
          providers: [{ provide: ProductListContentsDialogService, useValue: mockService }]
        }
      }
    );

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
      ],
      declarations: [
        ProductListContentsDialogComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
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
