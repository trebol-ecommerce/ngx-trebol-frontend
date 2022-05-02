/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Sell } from 'src/models/entities/Sell';
import { SellDetail } from 'src/models/entities/SellDetail';
import { ManagementSalesService } from '../../routes/sales/management-sales.service';
import { ManagementSellReviewDialogComponent } from './management-sell-review-dialog.component';
import { ManagementSellReviewDialogData } from './ManagementSellReviewDialogData';

@Component({ selector: 'app-sell-information' })
class MockSellInformationComponent {
  @Input() sell: Sell;
}

@Component({ selector: 'app-sell-details-table' })
class MockSellDetailsTableComponent {
  @Input() sellDetails: SellDetail[];
  @Input() editable: boolean;
  @Input() tableColumns: string[];
}

describe('ManagementSellReviewDialogComponent', () => {
  let component: ManagementSellReviewDialogComponent;
  let fixture: ComponentFixture<ManagementSellReviewDialogComponent>;
  let mockDialogData: Partial<ManagementSellReviewDialogData>;
  let salesServiceSpy: jasmine.SpyObj<ManagementSalesService>;
  let snackBarServiceSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDialogData = { sell: { } as Sell };
    const mockSalesService = jasmine.createSpyObj('ManagementSalesService', ['markRejected', 'markConfirmed', 'markComplete', 'fetch', 'reloadItems']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule
      ],
      declarations: [
        ManagementSellReviewDialogComponent,
        MockSellInformationComponent,
        MockSellDetailsTableComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: ManagementSalesService, useValue: mockSalesService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    salesServiceSpy = TestBed.inject(ManagementSalesService) as jasmine.SpyObj<ManagementSalesService>;
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    salesServiceSpy.fetch.and.returnValue(of(mockDialogData.sell));
    salesServiceSpy.reloadItems.and.returnValue(of(void 0));

    fixture = TestBed.createComponent(ManagementSellReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward a request to reject the sell', () => {
    salesServiceSpy.markRejected.and.returnValue(of(void 0));
    component.onClickReject();
    expect(salesServiceSpy.markRejected).toHaveBeenCalled();
  });

  it('should forward a request to confirm the sell', () => {
    salesServiceSpy.markConfirmed.and.returnValue(of(void 0));
    component.onClickConfirm();
    expect(salesServiceSpy.markConfirmed).toHaveBeenCalled();
  });

  it('should forward a request to complete the sell', () => {
    salesServiceSpy.markComplete.and.returnValue(of(void 0));
    component.onClickComplete();
    expect(salesServiceSpy.markComplete).toHaveBeenCalled();
  });
});
