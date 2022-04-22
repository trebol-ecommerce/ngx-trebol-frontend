/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, Observable, of } from 'rxjs';
import { skip, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock/mock-products.datasource';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { ProductList } from 'src/models/entities/ProductList';
import { ProductListContentsDialogComponent } from './product-list-contents-dialog.component';
import { ProductListContentsDialogData } from './ProductListContentsDialogData';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

const MOCK_PRODUCT_EXAMPLE = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
const MOCK_PRODUCT_EXAMPLE2 = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];

describe('ProductListContentsDialogComponent', () => {
  let component: ProductListContentsDialogComponent;
  let fixture: ComponentFixture<ProductListContentsDialogComponent>;
  let mockDialogData: Partial<ProductListContentsDialogData>;
  let apiServiceSpy: jasmine.SpyObj<ITransactionalProductListContentsDataApiService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialogData = {
      list: new ProductList()
    };
    const mockApiService = jasmine.createSpyObj('ITransactionalProductListContentsDataApiService', ['fetchContents', 'addToContents', 'updateContents', 'deleteFromContents']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
      ],
      declarations: [
        ProductListContentsDialogComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: API_INJECTION_TOKENS.dataProductLists, useValue: mockApiService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProductLists) as jasmine.SpyObj<ITransactionalProductListContentsDataApiService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    apiServiceSpy.addToContents.and.returnValue(of(void 0));
    apiServiceSpy.updateContents.and.returnValue(of(void 0));
    apiServiceSpy.deleteFromContents.and.returnValue(of(void 0));
    apiServiceSpy.fetchContents.and.returnValue(of({
      items: [
        MOCK_PRODUCT_EXAMPLE
      ],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 1
    }));

    fixture = TestBed.createComponent(ProductListContentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data', () => {
    component.products$.pipe(
      take(1),
      tap(ps => expect(ps).toEqual([MOCK_PRODUCT_EXAMPLE]))
    ).subscribe();
    expect(apiServiceSpy.fetchContents).toHaveBeenCalled();
  });

  it('should reload data', () => {
    component.reload();
    expect(apiServiceSpy.fetchContents).toHaveBeenCalledTimes(2);
  });

  it('should reload data when a page event is fired', () => {
    const ev: PageEvent = { length: 10, pageIndex: 1, pageSize: 5 };
    component.onPage(ev);
    expect(apiServiceSpy.fetchContents).toHaveBeenCalled();
  });

  it('should reload data when sorting parameters change', () => {
    const ev: Sort = { active: 'barcode', direction: 'asc' };
    component.onSortChange(ev);
    expect(apiServiceSpy.fetchContents).toHaveBeenCalled();
  });

  it('should popup a dialog to select products for addition and replacement of list contents', () => {
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => EMPTY as Observable<any>
    } as MatDialogRef<any>);
    component.onClickAddProducts();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    component.onClickChooseProducts();
    expect(dialogServiceSpy.open).toHaveBeenCalledTimes(2);
  });

  it('should remove products in the list', () => {
    component.products$.pipe(
      skip(1)
    )
    component.onClickRemoveProduct(MOCK_PRODUCT_EXAMPLE);
    expect(apiServiceSpy.deleteFromContents).toHaveBeenCalled();
  });

  describe('when the user makes a selection of products from the dialog', () => {
    beforeEach(() => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of([MOCK_PRODUCT_EXAMPLE2])
      } as MatDialogRef<any>);
    });

    it('should add products to the list', () => {
      component.onClickAddProducts();
      expect(apiServiceSpy.addToContents).toHaveBeenCalled();
    });

    it('should replace products in the list', () => {
      component.onClickChooseProducts();
      expect(apiServiceSpy.updateContents).toHaveBeenCalled();
    });

    it('should reload data each time there is an update to the products in the list', () => {
      component.onClickAddProducts();
      expect(apiServiceSpy.fetchContents).toHaveBeenCalledTimes(2);
      component.onClickChooseProducts();
      expect(apiServiceSpy.fetchContents).toHaveBeenCalledTimes(3);
    });
  });

  describe('when the user selects zero products from the dialog', () => {
    beforeEach(() => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of([])
      } as MatDialogRef<any>);
    });

    it('should add products to the list', () => {
      component.onClickAddProducts();
      expect(apiServiceSpy.addToContents).not.toHaveBeenCalled();
    });

    it('should replace products in the list', () => {
      component.onClickChooseProducts();
      expect(apiServiceSpy.updateContents).not.toHaveBeenCalled();
    });

    it('should reload data each time there is an update to the products in the list', () => {
      component.onClickAddProducts();
      expect(apiServiceSpy.fetchContents).toHaveBeenCalledTimes(1);
      component.onClickChooseProducts();
      expect(apiServiceSpy.fetchContents).toHaveBeenCalledTimes(1);
    });
  });
});
