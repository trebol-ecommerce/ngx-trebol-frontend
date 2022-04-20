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
  let mockService: Partial<ManagementCustomersService>;

  beforeEach(waitForAsync(() => {
    mockService = {
      reloadItems: () => EMPTY,
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      totalCount$: of(0),
      sortBy: undefined,
      order: undefined,
      pageIndex: undefined,
      pageSize: undefined
    };

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
    fixture = TestBed.createComponent(ManagementCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
