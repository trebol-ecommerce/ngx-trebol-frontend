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
import { ManagementSalespeopleComponent } from './management-salespeople.component';
import { ManagementSalespeopleService } from './management-salespeople.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-management-data-actions-button-bar' })
class MockManagementDataActionsComponent {
  @Input() actions: string[];
  @Output() add = new EventEmitter();
}

describe('ManagementSalespeopleComponent', () => {
  let component: ManagementSalespeopleComponent;
  let fixture: ComponentFixture<ManagementSalespeopleComponent>;
  let serviceSpy: jasmine.SpyObj<ManagementSalespeopleService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementSalespeopleService', ['reloadItems', 'removeItems']);
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
        ManagementSalespeopleComponent,
        MockCenteredMatSpinnerComponent,
        MockManagementDataActionsComponent
      ],
      providers: [
        { provide: ManagementSalespeopleService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ManagementSalespeopleService) as jasmine.SpyObj<ManagementSalespeopleService>;
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

    fixture = TestBed.createComponent(ManagementSalespeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
