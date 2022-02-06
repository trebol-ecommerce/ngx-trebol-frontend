/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Sell } from 'src/models/entities/Sell';
import { ManagementSalesService } from '../../routes/sales/management-sales.service';
import { ManagementSellReviewDialogComponent } from './management-sell-review-dialog.component';
import { ManagementSellReviewDialogData } from './ManagementSellReviewDialogData';

@Component({ selector: 'app-sell-information' })
class MockSellInformationComponent {
  @Input() sell: Sell;
}

@Component({ selector: 'app-sell-details-table' })
class MockSellDetailsTableComponent {
  @Input() sell: Sell;
}

describe('ManagementSellReviewDialogComponent', () => {
  let component: ManagementSellReviewDialogComponent;
  let fixture: ComponentFixture<ManagementSellReviewDialogComponent>;
  let mockDialogData: Partial<ManagementSellReviewDialogData>;
  let mockService: Partial<ManagementSalesService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDialogData = {
      sell: new Sell()
    };
    mockService = {
      markRejected() { return of(void 0); },
      markConfirmed() { return of(void 0); },
      markComplete() { return of(void 0); },
      fetch() { return of(new Sell()); }
    };
    mockSnackBarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        ManagementSellReviewDialogComponent,
        MockSellInformationComponent,
        MockSellDetailsTableComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: ManagementSalesService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSellReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
