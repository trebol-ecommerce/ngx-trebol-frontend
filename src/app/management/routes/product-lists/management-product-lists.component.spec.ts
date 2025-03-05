/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { MOCK_PRODUCT_LISTS } from 'src/app/api/local-memory/mock-data/mock-product-lists.datasource';
import { ProductList } from 'src/models/entities/ProductList';
import { EntityFormDialogComponent } from '../../dialogs/entity-form/entity-form-dialog.component';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { ManagementProductListsComponent } from './management-product-lists.component';
import { ManagementProductListsService } from './management-product-lists.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions-button-bar' })
class MockManagementDataActionsComponent {
  @Input() actions: string[];
  @Output() add = new EventEmitter();
}

describe('ManagementProductListsComponent', () => {
  let component: ManagementProductListsComponent;
  let fixture: ComponentFixture<ManagementProductListsComponent>;
  let serviceSpy: jasmine.SpyObj<ManagementProductListsService>;
  let mockDialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementProductListsService', ['reloadItems', 'removeItems']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
      declarations: [
        ManagementProductListsComponent,
        MockCenteredMatSpinnerComponent,
        MockManagementDataActionsComponent
      ],
      providers: [
        { provide: ManagementProductListsService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockDialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    serviceSpy = TestBed.inject(ManagementProductListsService) as jasmine.SpyObj<ManagementProductListsService>;
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

    fixture = TestBed.createComponent(ManagementProductListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete objects', () => {
    component.onClickDelete(null);
    expect(serviceSpy.removeItems).toHaveBeenCalled();
  });

  it('should refresh the view after deleting an object', () => {
    serviceSpy.removeItems.and.returnValue(of(void 0));
    serviceSpy.reloadItems.and.returnValue(of(void 0));
    const img = MOCK_PRODUCT_LISTS[0];
    component.onClickDelete(img);
    expect(serviceSpy.reloadItems).toHaveBeenCalled();
  });

  it('should open a dialog to edit items', () => {
    mockDialogServiceSpy.open.and.returnValue({
      afterClosed: () => EMPTY as Observable<any>
    } as MatDialogRef<any>);
    component.onClickEdit(null);
    expect(mockDialogServiceSpy.open).toHaveBeenCalled();
    expect(mockDialogServiceSpy.open).toHaveBeenCalledWith(
      EntityFormDialogComponent,
      {
        data: {
          isNewItem: true,
          item: null,
          entityType: 'productList',
          apiService: serviceSpy.dataService
        },
        width: '40rem'
      } as EntityFormDialogConfig<ProductList>
    );
  })
});
