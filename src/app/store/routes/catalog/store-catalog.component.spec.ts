/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreCartService } from '../../store-cart.service';
import { StoreCatalogComponent } from './store-catalog.component';
import { StoreCatalogService } from './store-catalog.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-slideshow' })
class MockSlideshowComponent {
  @Input() images: any[];
  @Input() showSlideSelectors: boolean;
  @Input() showNextPreviousButtons: boolean;
}

@Component({ selector: 'app-store-product-list-contents-display' })
class MockStoreProductListContentsDisplayComponent {
  @Input() list: ProductList;
  @Output() addProductToCart = new EventEmitter<void>();
}

@Component({ selector: 'app-store-location' })
class MockStoreLocationComponent {
  @Input() mapHeight: number;
}

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;
  let catalogServiceSpy: jasmine.SpyObj<StoreCatalogService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(waitForAsync(() => {
    const mockCatalogService = jasmine.createSpyObj('StoreCatalogService', ['reloadItems', 'navigateToProductDetails', 'fetchProductDetails']);
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['addProductToCart']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      queryParamMap: EMPTY
    };

    TestBed.configureTestingModule({
      imports: [
        MatDividerModule
      ],
      declarations: [
        StoreCatalogComponent,
        MockCenteredMatSpinnerComponent,
        MockSlideshowComponent,
        MockStoreProductListContentsDisplayComponent,
        MockStoreLocationComponent
      ],
      providers: [
        { provide: StoreCatalogService, useValue: mockCatalogService },
        { provide: StoreCartService, useValue: mockCartService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    catalogServiceSpy = TestBed.inject(StoreCatalogService) as jasmine.SpyObj<StoreCatalogService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    catalogServiceSpy.reloadItems.and.returnValue(EMPTY);
    catalogServiceSpy.navigateToProductDetails.and.returnValue(EMPTY);
    catalogServiceSpy.fetchProductDetails.and.returnValue(EMPTY);
    catalogServiceSpy.loading$ = of(false);
    catalogServiceSpy.listsPage$ = of({
      items: [],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0
    });
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => of(void 0)
    } as MatDialogRef<any>);

    fixture = TestBed.createComponent(StoreCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
