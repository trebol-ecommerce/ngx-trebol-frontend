/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ManagementProductsComponent } from './management-products.component';
import { ManagementProductsService } from './management-products.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions' })
class MockManagementDataActionsComponent {
  @Output() add = new EventEmitter();
}

describe('ManagementProductsComponent', () => {
  let component: ManagementProductsComponent;
  let fixture: ComponentFixture<ManagementProductsComponent>;
  let mockManagerService: Partial<ManagementProductsService>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockManagerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      focusedItems: [],
      items$: of([]),
      totalCount$: of(0),
      canEdit$: of(true),
      canAdd$: of(true),
      canDelete$: of(true),
      updateAccess(acc) { },
      dataService: null,
      sortBy: undefined,
      order: undefined,
      pageIndex: undefined,
      pageSize: undefined
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
      ],
      declarations: [
        ManagementProductsComponent,
        MockManagementDataActionsComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: ManagementProductsService, useValue: mockManagerService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
