/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { ManagementCustomersComponent } from './management-customers.component';
import { ManagementCustomersService } from './management-customers.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

describe('ManagementCustomersComponent', () => {
  let component: ManagementCustomersComponent;
  let fixture: ComponentFixture<ManagementCustomersComponent>;
  let serviceSpy: jasmine.SpyObj<ManagementCustomersService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ManagementCustomersService', ['reloadItems']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
      ],
      declarations: [
        ManagementCustomersComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: ManagementCustomersService, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ManagementCustomersService) as jasmine.SpyObj<ManagementCustomersService>;
    serviceSpy.reloadItems.and.returnValue(EMPTY);
    serviceSpy.loading$ = of(false);
    serviceSpy.focusedItems$ = of([]);
    serviceSpy.items$ = of([]);
    serviceSpy.totalCount$ = of(0);
    serviceSpy.sortBy = undefined;
    serviceSpy.order = undefined;
    serviceSpy.pageIndex = undefined;
    serviceSpy.pageSize = undefined;

    fixture = TestBed.createComponent(ManagementCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
