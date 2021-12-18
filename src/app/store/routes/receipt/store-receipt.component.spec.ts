/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { StoreReceiptComponent } from './store-receipt.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-store-receipt-details-table' })
class MockReceiptDetailsTable {
  @Input() details: any[];
}

describe('StoreReceiptComponent', () => {
  let component: StoreReceiptComponent;
  let fixture: ComponentFixture<StoreReceiptComponent>;
  let mockReceiptApiService: Partial<IReceiptPublicApiService>;

  beforeEach(waitForAsync(() => {
    mockReceiptApiService = {
      fetchTransactionReceiptByToken() { return EMPTY; }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [
        StoreReceiptComponent,
        MockCenteredMatSpinnerComponent,
        MockReceiptDetailsTable
      ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.receipt, useValue: mockReceiptApiService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
