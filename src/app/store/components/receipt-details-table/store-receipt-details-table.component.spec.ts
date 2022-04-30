/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ReceiptDetail } from 'src/models/ReceiptDetail';
import { StoreReceiptDetailsTableComponent } from './store-receipt-details-table.component';

describe('StoreReceiptDetailsTableComponent', () => {
  let component: StoreReceiptDetailsTableComponent;
  let fixture: ComponentFixture<StoreReceiptDetailsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [ StoreReceiptDetailsTableComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiptDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the datasource when receiving a value in its [details] binding', () => {
    const payload: ReceiptDetail[] = [
      {
        product: { barcode: 'some-barcode' },
        units: 1
      }
    ];
    component.details = payload;
    expect(component.details).toBe(payload);
    expect(component.dataSource.data).toBe(payload);
  });
});
