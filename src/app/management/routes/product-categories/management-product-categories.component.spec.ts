/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { ProductCategoryTreeService } from 'src/app/shared/components/product-category-tree/product-category-tree.service';
import { ManagementProductCategoriesComponent } from './management-product-categories.component';
import { ManagementProductCategoriesService } from './management-product-categories.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions-button-bar' })
class MockManagementDataActionsComponent {
  @Input() actions: string[];
  @Output() add = new EventEmitter();
}

@Component({ selector: 'app-product-category-tree' })
class MockProductCategoryTreeComponent {
  @Input() categories: any[];
  @Input() editable: boolean;
}

describe('ManagementProductCategoriesComponent', () => {
  let component: ManagementProductCategoriesComponent;
  let fixture: ComponentFixture<ManagementProductCategoriesComponent>;
  let mockService: Partial<ManagementProductCategoriesService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let categoryTreeServiceSpy: jasmine.SpyObj<ProductCategoryTreeService>;

  beforeEach(waitForAsync(() => {
    mockService = {
      reloadItems: () => EMPTY,
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      totalCount$: of(0),
      focusedItems: [],
      sortBy: undefined,
      order: undefined,
      pageIndex: undefined,
      pageSize: undefined
    };
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockCategoryTreeService = jasmine.createSpyObj('ProductCategoryTreeService', ['reloadCategories']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        ManagementProductCategoriesComponent,
        MockManagementDataActionsComponent,
        MockCenteredMatSpinnerComponent,
        MockProductCategoryTreeComponent
      ],
      providers: [
        { provide: ManagementProductCategoriesService, useValue: mockService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: ProductCategoryTreeService, useValue: mockCategoryTreeService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    categoryTreeServiceSpy = TestBed.inject(ProductCategoryTreeService) as jasmine.SpyObj<ProductCategoryTreeService>;

    fixture = TestBed.createComponent(ManagementProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
