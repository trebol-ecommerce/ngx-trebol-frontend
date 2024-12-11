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
import { EMPTY, of } from 'rxjs';
import { Order } from 'src/models/entities/Order';
import { ManagementOrdersComponent } from './management-orders.component';
import { ManagementOrdersService } from './management-orders.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions-button-bar' })
class MockManagementDataActionsComponent {
  @Input() actions: string[];
  @Output() add = new EventEmitter();
}

describe('ManagementOrdersComponent', () => {
  let component: ManagementOrdersComponent;
  let fixture: ComponentFixture<ManagementOrdersComponent>;
  let serviceSpy: jasmine.SpyObj<ManagementOrdersService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementOrdersService', ['reloadItems', 'removeItems', 'fetch',]);
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
        ManagementOrdersComponent
      ],
      providers: [
        { provide: ManagementOrdersService, useValue: mockService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ManagementOrdersService) as jasmine.SpyObj<ManagementOrdersService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    serviceSpy.fetch.and.returnValue(EMPTY);
    serviceSpy.reloadItems.and.returnValue(of(void 0));
    serviceSpy.removeItems.and.returnValue(of(void 0));
    serviceSpy.loading$ = of(false);
    serviceSpy.focusedItems$ = of([]);
    serviceSpy.items$ = of([]);
    serviceSpy.totalCount$ = of(0);
    serviceSpy.sortBy = undefined;
    serviceSpy.order = undefined;
    serviceSpy.pageIndex = undefined;
    serviceSpy.pageSize = undefined;

    fixture = TestBed.createComponent(ManagementOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete items', () => {
    component.onClickDelete({ buyOrder: 1 } as Order);
    expect(serviceSpy.removeItems).toHaveBeenCalled();
  });

  it('should refresh after deleting items', () => {
    component.onClickDelete({ buyOrder: 1 } as Order);
    expect(serviceSpy.reloadItems).toHaveBeenCalled();
  });

  it('should fetch details of individual orders', () => {
    component.onClickView({ item: { buyOrder: 1 }, focused: false });
    expect(serviceSpy.fetch).toHaveBeenCalled();
  });

  it('should open details of individual orders in a dialog', () => {
    serviceSpy.fetch.and.returnValue(of({ buyOrder: 1 } as Order));
    dialogServiceSpy.open.and.returnValue({ afterClosed: () => of(void 0) } as MatDialogRef<any>);

    component.onClickView({ item: { buyOrder: 1 }, focused: false });
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });
});
