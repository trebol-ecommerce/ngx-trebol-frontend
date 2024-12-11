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
import { Order } from 'src/models/entities/Order';
import { OrderDetail } from 'src/models/entities/OrderDetail';
import { ManagementOrdersService } from '../../routes/orders/management-orders.service';
import { ManagementOrderReviewDialogComponent } from './management-order-review-dialog.component';
import { ManagementOrderReviewDialogData } from './ManagementOrderReviewDialogData';

@Component({ selector: 'app-order-information' })
class MockOrderInformationComponent {
  @Input() order: Order;
}

@Component({ selector: 'app-order-details-table' })
class MockOrderDetailsTableComponent {
  @Input() orderDetails: OrderDetail[];
  @Input() editable: boolean;
  @Input() tableColumns: string[];
}

describe('ManagementOrderReviewDialogComponent', () => {
  let component: ManagementOrderReviewDialogComponent;
  let fixture: ComponentFixture<ManagementOrderReviewDialogComponent>;
  let mockDialogData: Partial<ManagementOrderReviewDialogData>;
  let ordersServiceSpy: jasmine.SpyObj<ManagementOrdersService>;
  let snackBarServiceSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDialogData = { order: { } as Order };
    const mockOrdersService = jasmine.createSpyObj('ManagementOrdersService', ['markRejected', 'markConfirmed', 'markComplete', 'fetch', 'reloadItems']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule
      ],
      declarations: [
        ManagementOrderReviewDialogComponent,
        MockOrderInformationComponent,
        MockOrderDetailsTableComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: ManagementOrdersService, useValue: mockOrdersService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    ordersServiceSpy = TestBed.inject(ManagementOrdersService) as jasmine.SpyObj<ManagementOrdersService>;
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    ordersServiceSpy.fetch.and.returnValue(of(mockDialogData.order));
    ordersServiceSpy.reloadItems.and.returnValue(of(void 0));

    fixture = TestBed.createComponent(ManagementOrderReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward a request to reject the order', () => {
    ordersServiceSpy.markRejected.and.returnValue(of(void 0));
    component.onClickReject();
    expect(ordersServiceSpy.markRejected).toHaveBeenCalled();
  });

  it('should forward a request to confirm the order', () => {
    ordersServiceSpy.markConfirmed.and.returnValue(of(void 0));
    component.onClickConfirm();
    expect(ordersServiceSpy.markConfirmed).toHaveBeenCalled();
  });

  it('should forward a request to complete the order', () => {
    ordersServiceSpy.markComplete.and.returnValue(of(void 0));
    component.onClickComplete();
    expect(ordersServiceSpy.markComplete).toHaveBeenCalled();
  });
});
