/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CenteredMatProgressSpinnerComponent } from 'src/app/shared/components/centered-mat-spinner/centered-mat-spinner.component';
import { ManagementCustomersComponent } from './management-customers.component';
import { ManagementCustomersService } from './management-customers.service';

describe('ManagementCustomersComponent', () => {
  let component: ManagementCustomersComponent;
  let fixture: ComponentFixture<ManagementCustomersComponent>;
  let managerService: Partial<ManagementCustomersService>;

  beforeEach(waitForAsync(() => {
    managerService = {
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      canEdit$: of(true),
      canAdd$: of(true),
      canDelete$: of(true),
      updateAccess(acc) {}
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatTableModule
      ],
      declarations: [
        ManagementCustomersComponent ,
        CenteredMatProgressSpinnerComponent
      ],
      providers: [
        { provide: ManagementCustomersService, useValue: managerService }
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
