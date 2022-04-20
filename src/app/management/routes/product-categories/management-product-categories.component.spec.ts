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
  let serviceSpy: jasmine.SpyObj<ManagementProductCategoriesService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let categoryTreeServiceSpy: jasmine.SpyObj<ProductCategoryTreeService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementProductCategoriesService', ['reloadItems', 'removeItems']);
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
    serviceSpy = TestBed.inject(ManagementProductCategoriesService) as jasmine.SpyObj<ManagementProductCategoriesService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    categoryTreeServiceSpy = TestBed.inject(ProductCategoryTreeService) as jasmine.SpyObj<ProductCategoryTreeService>;
    serviceSpy.reloadItems.and.returnValue(EMPTY);
    serviceSpy.removeItems.and.returnValue(EMPTY);
    serviceSpy.loading$ = of(false);
    serviceSpy.focusedItems$ = of([]);
    serviceSpy.items$ = of([]);
    serviceSpy.totalCount$ = of(0);
    serviceSpy.sortBy = undefined;
    serviceSpy.order = undefined;
    serviceSpy.pageIndex = undefined;
    serviceSpy.pageSize = undefined;
    categoryTreeServiceSpy.reloadCategories.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(ManagementProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
