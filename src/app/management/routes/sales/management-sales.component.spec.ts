/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { EMPTY, of } from 'rxjs';
import { ManagementSalesComponent } from './management-sales.component';
import { ManagementSalesService } from './management-sales.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions-button-bar' })
class MockManagementDataActionsComponent {
  @Input() actions: string[];
  @Output() add = new EventEmitter();
}

describe('ManagementSalesComponent', () => {
  let component: ManagementSalesComponent;
  let fixture: ComponentFixture<ManagementSalesComponent>;
  let serviceSpy: jasmine.SpyObj<ManagementSalesService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementSalesService', ['reloadItems', 'removeItems']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);

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
        MockCenteredMatSpinnerComponent,
        MockManagementDataActionsComponent,
        ManagementSalesComponent
      ],
      providers: [
        { provide: ManagementSalesService, useValue: mockService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ManagementSalesService) as jasmine.SpyObj<ManagementSalesService>;
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

    fixture = TestBed.createComponent(ManagementSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
